import React from 'react';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  isAuthenticated: boolean;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, isAuthenticated, element }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
