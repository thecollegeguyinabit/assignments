import { Routes, Route, Navigate} from 'react-router-dom';
import {  useState  } from 'react';

import ProtectedRoute from '@/lib/ProtectedRoute';
import { useBlogs } from './hooks/useApi';

import { BlogTable } from './components/admin/BlogTable';
import { BlogForm } from './components/admin/BlogForm';
import { CategoryTable } from './components/admin/CategoryTable';
import { CategoryForm } from './components/admin/CategoryForm';
import { SearchBar } from './components/common/SearchBar';
import { BlogList } from './components/common/BlogList';
import { AdminLayout } from './components/layout/AdminLayout';
import { Header } from './components/common/Header';
import {BlogDetail}  from './components/common/BlogDetail';
import { SignupForm } from './components/common/SignUp';
import { AdminLogin } from './components/common/Login';

import './App.css';

function Home() {
  const { data: blogs = [] } = useBlogs();
  const [search, setSearch] = useState('');
  return (
    <div className="container mx-auto py-8 ">
      <Header />
      <SearchBar search={search} setSearch={setSearch} />
      <h1 className="text-7xl text-teal-400 text-center font-bold mb-5 ">Blog</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8 px-22">
          Discover stories and ideas from writers on any topic
      </p>
      <BlogList blogs={blogs} search={search}/>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:slug" element={<BlogDetail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<SignupForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="blogs" element={<BlogTable />} />
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/:id/edit" element={<BlogForm />} /> 
          <Route path="categories" element={<CategoryTable />} />
          <Route path="categories/new" element={<CategoryForm />} />
          <Route path="categories/:id/edit" element={<CategoryForm />} />
          <Route index element={<Navigate to="blogs" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}