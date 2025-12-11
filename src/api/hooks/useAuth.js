import { useState, useCallback } from 'react';
import { login as loginRequest } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async ({ email, password, remember }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginRequest({ email, password });
      
      // Log the full response for debugging
      console.log('Login response:', data);
      
      // Try multiple possible token locations in the response
      const token = 
        data?.token || 
        data?.accessToken || 
        data?.access_token ||
        data?.data?.token ||
        data?.data?.accessToken ||
        data?.data?.access_token ||
        data?.auth?.token ||
        data?.auth?.accessToken ||
        data?.result?.token ||
        data?.result?.accessToken;
      
      if (token) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('token', token);
        console.log('Token saved to', remember ? 'localStorage' : 'sessionStorage');
      } else {
        console.warn('Login response received but no token found. Full response:', JSON.stringify(data, null, 2));
      }
      
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Login failed. Please try again.';
      setError(message);
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    login,
    loading,
    error,
  };
};
