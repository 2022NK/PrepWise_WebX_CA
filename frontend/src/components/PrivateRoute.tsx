import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { isAuthenticated } from '@/api/auth';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  // Use the isAuthenticated function from our auth API
  if (!isAuthenticated()) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;