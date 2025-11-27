import type { Blog } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useMemo } from 'react';

export function BlogList({ blogs, search }: { blogs: Blog[] , search: string}) {
  const navigate = useNavigate();

  // Filter blogs based on search term
  const filteredBlogs = useMemo(() => {
    if (!search.trim()) return blogs;
    
    const searchLower = search.toLowerCase();
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchLower) ||
      blog.excerpt.toLowerCase().includes(searchLower) ||
      blog.category.name.toLowerCase().includes(searchLower)
    );
  }, [blogs, search]);
  
  // Show message when no blogs match the search
  if (filteredBlogs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No blogs found matching "{search}"
      </div>
    );
  }


  return (
    <div className="grid min-w-fit px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <Card key={blog._id} onClick={() => navigate(`/${blog.slug}`)} className={`cursor-pointer ${!blog.thumbnail && "pt-30 " }` }>
          <CardHeader>
            {blog.thumbnail  && <img src={blog.thumbnail} alt={blog.title} className="w-full  h-48 object-cover rounded" /> }
            <CardTitle>{blog.title}</CardTitle>
            <Badge>{blog.category.name}</Badge>
          </CardHeader>
          <CardContent className='-mt-3'>
            <CardDescription className='md:truncate'>{blog.excerpt}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}