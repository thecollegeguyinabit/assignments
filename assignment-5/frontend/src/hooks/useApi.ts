import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Blog, BlogInput, Category } from '../types';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});

export const useAuth = () => {
  const login = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data } = await api.post('/auth/login', { email, password })
      return data;
    },
  });
  const signup = useMutation({
    mutationFn: async ({ email, password, role, name }: { email: string; password: string; role: string; name: string }) => {
      const { data } = await api.post('/auth/signup', { email, password, role, name });
      return data;
    },
  });

  return { login, signup };
}

export const useBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: () => api.get('/blogs').then((res) => res.data),
  });
}

export const useBlogBySlug = (slug: string) => {
  return useQuery<Blog>({
    queryKey: ['blog', slug],
    queryFn: () => api.get(`/blogs/${slug}`).then((res) => res.data),
    enabled: !!slug,
  });
}

export const useSearchBlogs = (search: string) => {
  return useQuery<Blog[]>({
    queryKey: ['blogs', 'search', search],
    queryFn: () => api.get(`/blogs?search=${search}`).then((res) => res.data),
    enabled: !!search,
  });
}

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then((res) => res.data),
  });
}

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blog: BlogInput) => api.post('/blogs', blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  });
}

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...blog }: { id: string } & BlogInput) => api.put(`/blogs/admin/${id}`, blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  });
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/blogs/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  });
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: { name: string}) => api.post('/categories', category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  });
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...category }: { id: string, name: string }) => api.put(`/categories/admin/${id}`, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  });
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/categories/admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  });
}
