import client from '../clients';
import { ENDPOINTS } from '../constants/endpoints';

// Fetch recent activity for dashboard
export const fetchRecentActivity = async () => {
  const response = await client.get(ENDPOINTS.RECENT_ACTIVITY);
  return response.data;
};

// Fetch top locations (suburbs) stats for dashboard
export const fetchTopLocations = async () => {
  const response = await client.get(ENDPOINTS.TOP_LOCATIONS);
  return response.data;
};

