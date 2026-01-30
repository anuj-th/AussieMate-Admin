import axios from 'axios';
import { clearAuth, getToken } from '../utils/auth';

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

// Attach token from storage if present
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // If data is FormData, remove Content-Type to let browser set it with boundary
  if (config.data instanceof FormData || (config.data && config.data.constructor && config.data.constructor.name === 'FormData')) {
    delete config.headers['Content-Type'];
    delete config.headers['content-type'];
  }
  return config;
});

// Pass through responses; auto-logout on 401
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const getApiBaseUrl = () => BASE_URL;
export default client;
