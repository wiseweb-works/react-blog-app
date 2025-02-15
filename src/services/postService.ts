import { AxiosError } from 'axios';
import { ToastNotify } from '../helper/ToastNotify';
import api from './api';

export const fetchPosts = async () => {
  const response = await api.get('/blogs');
  return response.data.data;
};

export const fetchPostById = async (id: number) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/categories/');
  return response.data.data;
};

export const fetchCommentsByBlogId = async (blogId: number) => {
  try {
    const response = await api.get(`/comments?filter[blogId]=${blogId}`);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify(
        'error',
        error.response?.data?.message || 'Yorumları alırken hata oluştu'
      );
    } else {
      ToastNotify('error', 'Beklenmeyen bir hata oluştu');
    }
    return [];
  }
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
      ToastNotify(
        'error',
        error.response?.data?.message || 'Post creation failed'
      );
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};

export const createComment = async (data: {
  comment: string;
  blogId: number;
}) => {
  try {
    const response = await api.post('/comments/', data);
    if (response.status === 201) {
      ToastNotify('success', 'Comment created successfully');
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify(
        'error',
        error.response?.data?.message || 'Comment creation failed'
      );
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};
