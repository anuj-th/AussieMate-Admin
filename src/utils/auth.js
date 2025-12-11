/**
 * Check if user is authenticated by checking for token in storage
 * @returns {boolean} true if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  // Check both localStorage and sessionStorage for token
  const localToken = localStorage.getItem('token');
  const sessionToken = sessionStorage.getItem('token');
  return !!(localToken || sessionToken);
};

/**
 * Get the authentication token from storage
 * @returns {string|null} token if exists, null otherwise
 */
export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

/**
 * Clear authentication tokens from storage
 */
export const clearAuth = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  localStorage.removeItem('user');
};

