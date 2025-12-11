import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../../utils/auth';

/**
 * PublicRoute component - redirects to dashboard if user is already authenticated
 * Used for login page to prevent logged-in users from accessing it
 */
export default function PublicRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const location = useLocation();

  useEffect(() => {
    // Check authentication state when location changes
    setAuthenticated(isAuthenticated());
  }, [location]);

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

