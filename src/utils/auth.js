const getRawToken = () =>
  localStorage.getItem('token') || sessionStorage.getItem('token');

/**
 * Check if user is authenticated by checking for token in storage
 * @returns {boolean} true if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  try {
    const token = getRawToken();
    return Boolean(token && token.trim().length > 0);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

/**
 * Get the authentication token from storage
 * @returns {string|null} token if exists, null otherwise
 */
export const getToken = () => {
  try {
    const token = getRawToken();
    return token && token.trim().length > 0 ? token : null;
  } catch {
    return null;
  }
};

/**
 * Clear authentication tokens from storage
 */
export const clearAuth = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  localStorage.removeItem('user');
};

