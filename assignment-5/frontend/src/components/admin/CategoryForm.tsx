import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useCategories, useCreateCategory, useUpdateCategory } from '@/hooks/useApi';


// Zod schema for form validation
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
})

type FormData = z.infer<typeof schema>


export function CategoryForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: category, isLoading: isCategoryLoading } = useCategories();

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  // Reset form with fetched category data
  useEffect(() => {
    if (isEdit && category && Array.isArray(category) && category.length > 0) {
      form.reset()
    }
  }, [category, form, isEdit])

  const onSubmit = (data: FormData) => {
    if (isEdit) {
      updateCategory.mutate({ id: id!, ...data }, {
        onSuccess: () => navigate('/admin/categories'),
      })
    } else {
      createCategory.mutate(data, {
        onSuccess: () => navigate('/admin/categories'),
      })
    }
  }

  const isPending = createCategory.isPending || updateCategory.isPending;

  // Show a loading state while fetching the category for editing
  if (isEdit && isCategoryLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg p-4 md:p-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>{isEdit ? 'Edit Category' : 'Create New Category'}</CardTitle>
          <CardDescription>
            {isEdit ? 'Update the details of the existing category.' : 'Add a new category to organize your blog posts.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Technology, Lifestyle, Finance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/categories')} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEdit ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}