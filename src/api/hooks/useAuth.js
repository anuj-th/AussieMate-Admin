import { useState, useCallback, useEffect } from 'react';
import { login as loginRequest, fetchProfile, updateProfile, uploadProfilePhoto, deleteProfilePhoto } from '../services/authService';
import { clearAuth } from '../../utils/auth';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async ({ email, password, remember }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginRequest({ email, password });

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
      }

      const userData = data?.data?.user || data?.user;
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
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

  const refreshProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProfile();
      const fetchedUser = data?.data?.user || data?.user;
      if (fetchedUser) {
        localStorage.setItem('user', JSON.stringify(fetchedUser));
        setUser(fetchedUser);
      }
      return fetchedUser;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to load profile.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfileInfo = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateProfile(payload);
      const updatedUser = data?.data?.user || data?.user;
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      return updatedUser;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to update profile.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadPhoto = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await uploadProfilePhoto(file);
      const updatedUser = data?.data?.user || data?.user;
      const profilePhoto = data?.data?.profilePhoto || data?.profilePhoto;

      if (updatedUser) {
        const merged = { ...updatedUser };
        if (profilePhoto) merged.profilePhoto = profilePhoto;
        localStorage.setItem('user', JSON.stringify(merged));
        setUser(merged);
      } else if (profilePhoto && user) {
        const merged = { ...user, profilePhoto };
        localStorage.setItem('user', JSON.stringify(merged));
        setUser(merged);
      }
      return updatedUser;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to upload photo.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deletePhoto = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await deleteProfilePhoto();
      const updatedUser = data?.data?.user || data?.user;

      if (updatedUser) {
        // Remove profilePhoto from user object
        const { profilePhoto, ...userWithoutPhoto } = updatedUser;
        localStorage.setItem('user', JSON.stringify(userWithoutPhoto));
        setUser(userWithoutPhoto);
      } else if (user) {
        // If no updated user in response, just remove profilePhoto locally
        const { profilePhoto, ...userWithoutPhoto } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPhoto));
        setUser(userWithoutPhoto);
      }
      return updatedUser;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to delete photo.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  return {
    login,
    refreshProfile,
    updateProfile: updateProfileInfo,
    uploadPhoto,
    deletePhoto,
    logout,
    loading,
    error,
    user,
  };
};

// Load profile on mount if we already have a token but no user cached
export const useAuthInit = (refreshProfile) => {
  useEffect(() => {
    refreshProfile?.().catch(() => {});
  }, [refreshProfile]);
};
