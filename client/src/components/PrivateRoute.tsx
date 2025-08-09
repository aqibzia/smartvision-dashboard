import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { token, user } = useAuth();
  return token && user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
