
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-college-bg-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-college-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If no specific roles are required or user's role is allowed
  if (allowedRoles.length === 0 || allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }
  
  // User doesn't have permission - redirect to dashboard
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
