import client from '../clients';
import { ENDPOINTS } from '../constants/endpoints';

export const login = async (payload) => {
  const response = await client.post(ENDPOINTS.AUTH_LOGIN, payload);
  return response.data;
};
