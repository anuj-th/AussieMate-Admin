import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../../utils/auth';

/**
 * ProtectedRoute component - redirects to login if user is not authenticated
 */
export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const location = useLocation();

  useEffect(() => {
    // Check authentication state when location changes
    setAuthenticated(isAuthenticated());
  }, [location]);

  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

