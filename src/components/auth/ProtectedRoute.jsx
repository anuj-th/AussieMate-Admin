import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, clearAuth } from '../../utils/auth';

/**
 * ProtectedRoute component - redirects to login if user is not authenticated
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  
  // Check authentication synchronously on every render
  // This ensures we always check the latest token state
  const authenticated = isAuthenticated();

  // Immediately redirect if not authenticated
  if (!authenticated) {
    clearAuth();
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

