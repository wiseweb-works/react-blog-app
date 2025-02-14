import axios from 'axios';

const api = axios.create({
  baseURL: 'https://30133.fullstack.clarusway.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Authorization ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
