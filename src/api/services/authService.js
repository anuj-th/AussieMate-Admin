import client from '../clients';
import { ENDPOINTS } from '../constants/endpoints';

export const login = async (payload) => {
  const response = await client.post(ENDPOINTS.AUTH_LOGIN, payload);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await client.get(ENDPOINTS.AUTH_ME);
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await client.put(ENDPOINTS.AUTH_PROFILE, payload);
  return response.data;
};

export const uploadProfilePhoto = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }
  
  const formData = new FormData();
  // Common multer field names: 'file', 'photo', 'image', 'profilePhoto'
  // Using 'file' as it's the most common default for multer.single()
  formData.append('file', file);
  
  const response = await client.post(ENDPOINTS.AUTH_PROFILE_PHOTO, formData);
  return response.data;
};

export const deleteProfilePhoto = async () => {
  const response = await client.delete(ENDPOINTS.AUTH_DELETE_PROFILE_PHOTO);
  return response.data;
};
