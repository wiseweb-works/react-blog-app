import { AxiosError } from 'axios';
import { ToastNotify } from '../helper/ToastNotify';
import api from './api';

export const fetchPosts = async () => {
  const response = await api.get('/blogs');
  return response.data.data;
};

export const fetchPostById = async (id: number) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories/');
  return response.data.data;
};

export const createPost = async (data: {
  title: string;
  image: string;
  categoryId: string;
  isPublished: boolean;
  content: string;
}) => {
  try {
    const response = await api.post('/blogs', data);
    if (response.status === 201) {
      ToastNotify('success', 'Post created successfully');
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify('error', error.response?.data?.message || 'Login failed');
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};
