import axios from 'axios';

// Base URL for the backend API (set VITE_API_BASE_URL in your .env/.env.local)
const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = RAW_BASE_URL ? RAW_BASE_URL.replace(/\/$/, '') : '';

if (!BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not configured');
}

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Attach token from localStorage or sessionStorage if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Pass through responses; normalize errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // optional: auto logout on 401
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const getApiBaseUrl = () => BASE_URL;
export default client;
