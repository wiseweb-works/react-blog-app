import api from './api';

export const fetchPosts = async () => {
  const response = await api.get('/blogs');
  return response.data.data;
};

export const fetchPostById = async (id: number) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const createPost = async (data: {
  title: string;
  body: string;
  userId: number;
}) => {
  const response = await api.post('/blogs', data);
  return response.data;
};
