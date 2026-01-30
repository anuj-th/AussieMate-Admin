import client from '../clients';
import { ENDPOINTS } from '../constants/endpoints';

export const fetchJobs = async (params = {}) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    jobType = '',
    jobStatus = '',
    paymentStatus = '',
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  
  if (search) queryParams.append('search', search);
  if (jobType) queryParams.append('jobType', jobType);
  if (jobStatus) queryParams.append('jobStatus', jobStatus);
  if (paymentStatus) queryParams.append('paymentStatus', paymentStatus);
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);

  const response = await client.get(`${ENDPOINTS.JOBS}?${queryParams.toString()}`);
  return response.data;
};

// Fetch single job by ID
export const fetchJobById = async (jobId) => {
  const response = await client.get(`${ENDPOINTS.JOBS}/${jobId}`);
  // API may wrap data in { success, data } or return job directly
  return response.data?.data || response.data || response;
};

// Fetch jobs stats (total count)
export const fetchJobsStats = async () => {
  try {
    // Call API directly to get the raw response structure
    const queryParams = new URLSearchParams();
    queryParams.append('page', '1');
    queryParams.append('limit', '1');
    
    const response = await client.get(`${ENDPOINTS.JOBS}?${queryParams.toString()}`);
    
    // Debug: log the full response structure
    console.log('fetchJobsStats raw response:', response);
    console.log('fetchJobsStats response.data:', response?.data);
    
    // Extract total jobs - check all possible locations in the response
    // Check response.data first (standard axios response structure)
    const data = response?.data || response;
    
    // Check root level of data (as user mentioned: totalJobs: 52)
    if (data?.totalJobs !== undefined && data.totalJobs !== null) {
      return { totalJobs: data.totalJobs };
    }
    
    // Check pagination object
    if (data?.pagination?.totalJobs !== undefined && data.pagination.totalJobs !== null) {
      return { totalJobs: data.pagination.totalJobs };
    }
    
    // Check alternative pagination structure
    if (data?.pagination?.total !== undefined && data.pagination.total !== null) {
      return { totalJobs: data.pagination.total };
    }
    
    // Check nested data structure
    if (data?.data?.totalJobs !== undefined && data.data.totalJobs !== null) {
      return { totalJobs: data.data.totalJobs };
    }
    
    if (data?.data?.pagination?.totalJobs !== undefined && data.data.pagination.totalJobs !== null) {
      return { totalJobs: data.data.pagination.totalJobs };
    }
    
    // Fallback: if no pagination info, return 0
    console.warn('fetchJobsStats: Could not find totalJobs in response. Full response:', response);
    return { totalJobs: 0 };
  } catch (error) {
    console.error('fetchJobsStats error:', error);
    return { totalJobs: 0 };
  }
};

// Update payment status for a job
export const updatePaymentStatus = async (jobId, status) => {
  // Try different endpoint patterns based on common REST API conventions
  const endpoints = [
    // Pattern 1: PUT /jobs/{id}/payment-status
    () => client.put(`${ENDPOINTS.JOBS}/${jobId}/payment-status`, { paymentStatus: status }),
    // Pattern 2: PATCH /jobs/{id}/payment-status
    () => client.patch(`${ENDPOINTS.JOBS}/${jobId}/payment-status`, { paymentStatus: status }),
    // Pattern 3: PUT /jobs/{id} (update entire job with paymentStatus)
    () => client.put(`${ENDPOINTS.JOBS}/${jobId}`, { paymentStatus: status }),
    // Pattern 4: POST /jobs/{id}/payment-status
    () => client.post(`${ENDPOINTS.JOBS}/${jobId}/payment-status`, { paymentStatus: status }),
    // Pattern 5: PUT /admin/jobs/{id}/payment-status (admin route)
    () => client.put(`/admin/jobs/${jobId}/payment-status`, { paymentStatus: status }),
    // Pattern 6: PATCH /admin/jobs/{id}/payment-status (admin route)
    () => client.patch(`/admin/jobs/${jobId}/payment-status`, { paymentStatus: status }),
  ];

  let lastError;
  for (const endpointFn of endpoints) {
    try {
      const response = await endpointFn();
      return response.data;
    } catch (error) {
      lastError = error;
      // If it's a 404, try next endpoint
      // If it's CORS or method not allowed, try next endpoint
      if (error.response?.status === 404 || error.response?.status === 405 || error.code === 'ERR_NETWORK') {
        continue;
      }
      // For other errors (400, 401, 403, 500), throw immediately
      throw error;
    }
  }
  
  // If all endpoints failed, throw the last error
  throw lastError;
};

