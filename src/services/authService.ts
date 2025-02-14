import { AxiosError } from 'axios';
import { ToastNotify } from '../helper/ToastNotify';
import api from './api';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  city?: string;
  bio?: string;
}

export const login = async (data: LoginData) => {
  try {
    const response = await api.post('/auth/login', data);
    const userData = response.data;

    if (response.status === 200) {
      ToastNotify('success', 'Login successful');
      localStorage.setItem('token', userData.token);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify('error', error.response?.data?.message || 'Login failed');
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};

export const register = async (data: RegisterData) => {
  const response = await api.post('/users', data);
  return response.data;
};

export const logout = async () => {
  try {
    const response = await api.get('/auth/logout');

    if (response.status === 200) {
      ToastNotify('success', 'Logout successful');
      localStorage.removeItem('token');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify('error', error.response?.data?.message || 'Logout failed');
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};
