import client from '../clients';
import { ENDPOINTS } from '../constants/endpoints';

/**
 * Suspend/Delete user (Admin only)
 * @param {string} userId - The ID of the user to suspend/delete
 * @returns {Promise} The API response
 */
export const suspendUser = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  const response = await client.delete(`${ENDPOINTS.ADMIN_USERS}/${userId}`);
  return response.data;
};

