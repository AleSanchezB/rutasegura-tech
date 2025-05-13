import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // o la URL de tu backend
});

// Interceptor para agregar el token a cada request
api.interceptors.request.use(config => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const { token } = JSON.parse(storedUser);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
