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
      localStorage.setItem('userID', userData.user._id);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify('error', error.response?.data?.message || 'Login failed');
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};

export const getUserInfo = async () => {
  try {
    const response = await api.get('/users');

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify(
        'error',
        error.response?.data?.message || 'Error retrieving user data!'
      );
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};

export const register = async (data: RegisterData) => {
  try {
    const response = await api.post('/users', data);
    const userData = response.data;

    if (response.status === 201) {
      ToastNotify('success', 'User Creation successful');
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userID', userData.data._id);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify(
        'error',
        error.response?.data?.message || 'User Creation failed'
      );
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};

export const logout = async () => {
  try {
    const response = await api.get('/auth/logout');

    if (response.status === 200) {
      ToastNotify('success', 'Logout successful');
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      ToastNotify('error', error.response?.data?.message || 'Logout failed');
    } else {
      ToastNotify('error', 'An unexpected error occurred');
    }
  }
};
