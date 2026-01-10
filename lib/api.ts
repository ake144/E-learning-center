import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

const isServer = typeof window === 'undefined';
// Use internal docker network URL for server-side requests, public URL for client-side
const baseURL = isServer 
  ? (process.env.INTERNAL_API_URL || 'http://backend:3000') 
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().signOut();
    }
    return Promise.reject(error);
  }
);

export default api;
