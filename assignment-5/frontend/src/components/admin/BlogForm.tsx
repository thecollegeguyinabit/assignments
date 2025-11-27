import { useState } from 'react';
import { z } from 'zod';
import { TiptapEditor } from './TiptapEditor';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Image as ImageIcon, FileText, BookUser } from 'lucide-react';
import { useCategories, useCreateBlog, useUpdateBlog } from '@/hooks/useApi';
import type { BlogInput } from '@/types';
import { cn } from '@/lib/utils';
import { slugify } from '@/lib/utils';
import { blogSchema } from '@/schema';



type FormData = z.infer<typeof blogSchema>;

export function BlogForm({ blog }: { blog?: Partial<FormData> & { _id?: string } }) {

  const [tableOfContents, setTableOfContents] = useState(blog?.tableOfContents || []);
  const [activeHeading, setActiveHeading] = useState('');

  const { data: categories = [] } = useCategories();
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();

  const navigate = useNavigate();



  const form = useForm<FormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || '',
      slug: blog?.slug || '',
      category: blog?.category || '',
      description: blog?.description || '',
      excerpt: blog?.excerpt || '',
      publishDate: blog?.publishDate ? new Date(blog.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      thumbnail: blog?.thumbnail || '',
      tableOfContents: blog?.tableOfContents || [],
      tags: blog?.tags || [],
      author: blog?.author || 'Anonymous',
    },
  });

  // Generate slug from title
  const generateSlug = (title: string) => {
    const slug = slugify(title)
    form.setValue('slug', slug)
  }

  // Extract headings from content for table of contents
  const extractHeadings = (content: string) => {
    if (!content) return [];
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    const headings = Array.from(tempDiv.querySelectorAll('h1, h2, h3'))
      .map(heading => {
        const text = heading.textContent || ''
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        heading.id = id
        return {
          id,
          text,
          level: parseInt(heading.tagName.substring(1))
        }
      });
    
    return headings;
  }

  // Update table of contents when content changes
  const handleContentChange = (content: string) => {
    form.setValue('description', content, {shouldValidate: true});
    const headings = extractHeadings(content);
    setTableOfContents(headings);
    form.setValue('tableOfContents', headings);
  }


  // Scroll to heading
  const scrollToHeading = (id: string) => {
    setActiveHeading(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle Form Submit
  const onSubmit = (data: FormData) => {

    const selectedCategory = categories.find(cat => cat._id === data.category)
    const payload: BlogInput = {
      title: data.title,
      slug: data.slug,
      category: selectedCategory ? { _id: selectedCategory._id, name: selectedCategory.name } : { _id: '', name: '' },
      description: data.description,
      excerpt: data.excerpt,
      publishDate: new Date(data.publishDate).toISOString(),
      thumbnail: data.thumbnail,
      tableOfContents: tableOfContents,
      author: data.author || 'Anonymous',
    }

    if (blog?._id) {
      updateBlog.mutate({ id: blog._id, ...payload }, {
        onSuccess: () => navigate("/admin/blogs"),
      })
    } else {
      createBlog.mutate(payload, {
        onSuccess: () => navigate("/admin/blogs"),
      });
    }
  }

  const isPending = createBlog.isPending || updateBlog.isPending;


  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {blog?._id ? 'Update Blog Post' : 'Create New Blog Post'}
          </CardTitle>
          <CardDescription>
            Fill in the details below. Fields marked with an asterisk (*) are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Basic Information
                    </h3>
                    <Separator />
                    {/* Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter an engaging title..." 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e)
                                  generateSlug(e.target.value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="publishDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Publish Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief summary of your blog post..." 
                              className="min-h-[100px] max-w-3/5"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This will be displayed in blog listings and social media previews.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Content with Table of Contents */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content</h3>
                    <Separator />
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-3">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({field}) => (
                            <FormItem>
                              <FormLabel>Blog Body *</FormLabel>
                              <FormControl>
                                <TiptapEditor 
                                  content={field.value}
                                  onChange={handleContentChange}
                                /> 
                              </FormControl>
                              <FormDescription>
                                Use headings (H1, H2, H3) to create a table of contents. And use # for H1, ## for H2, ### for H3.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="lg:col-span-1 ">
                        <Card>
                          <CardHeader className="pb-3 h-0">
                            <CardTitle className="text-base">Table of Contents</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <ScrollArea className="h-auto">
                              <nav className="space-y-1 p-3">
                                {tableOfContents.length > 0 ? (
                                  tableOfContents.map((heading) => (
                                    <button
                                      key={heading.id}
                                      onClick={() => scrollToHeading(heading.id)}
                                      className={cn(
                                        "block w-full text-left py-1 px-2 text-sm rounded-md transition-colors",
                                        heading.level === 1 && "pl-4",
                                        heading.level === 2 && "pl-6",
                                        heading.level === 3 && "pl-8",
                                        activeHeading === heading.id
                                          ? "bg-primary/10 text-primary font-medium"
                                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                      )}
                                    >
                                      {heading.text}
                                    </button>
                                  ))
                                ) : (
                                  <p className="text-sm text-muted-foreground p-3">
                                    No headings found. Add H1-H3 headings to your content to create a table of contents.
                                  </p>
                                )}
                              </nav>
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                
                  {/* Thumbnail */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Thumbnail
                    </h3>
                    <Separator />
                    <div className="w-3/5">
                      <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thumbnail URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  {/* Author */}
                  <div className='space-y-3'>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <BookUser className="h-5 w-5" />
                        Author
                    </h3>
                    <Separator />
                    <div className="w-2/5">
                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />
                    </div>
                  </div>
              <div className="flex justify-end space-x-2 pt-4">
                {/* Cancel Button */}
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
                {/* Submit Button */}
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {blog?._id ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>{blog?._id ? 'Update Blog Post' : 'Create Blog Post'}</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}