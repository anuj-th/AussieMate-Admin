import client from '../clients';
import { ENDPOINTS } from '../constants/endpoints';

export const fetchCustomers = async (params = {}) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    role = '',
    status = '',
    location = '',
    badge = '',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  
  if (search) queryParams.append('search', search);
  if (role) queryParams.append('role', role);
  if (status) queryParams.append('status', status);
  if (location) queryParams.append('location', location);
  if (badge) queryParams.append('badge', badge);
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);

  const response = await client.get(`${ENDPOINTS.CUSTOMERS}?${queryParams.toString()}`);
  return response.data;
};

// Fetch customers jobs stats
export const fetchCustomersJobsStats = async () => {
  const response = await client.get(ENDPOINTS.CUSTOMERS_JOBS_STATS);
  return response.data;
};

// Fetch jobs for a specific customer
// GET /admin/customers/:customerId/jobs
export const fetchCustomerJobs = async (customerId) => {
  if (!customerId) throw new Error("customerId is required");
  const response = await client.get(
    `${ENDPOINTS.CUSTOMERS}/${encodeURIComponent(customerId)}/jobs`
  );
  return response.data;
};

// Fetch reviews for a specific customer
// GET /admin/customers/:customerId/reviews
export const fetchCustomerReviews = async (customerId, params = {}) => {
  if (!customerId) throw new Error("customerId is required");
  const { page, limit } = params;
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (limit) queryParams.append("limit", limit.toString());
  const qs = queryParams.toString();
  const response = await client.get(
    `${ENDPOINTS.CUSTOMERS}/${encodeURIComponent(customerId)}/reviews${qs ? `?${qs}` : ""}`
  );
  return response.data;
};

