import { useAuth } from "context";
import React from "react";
import { PathRouteProps, Navigate } from "react-router-dom";

interface ProtectedRouteProps extends PathRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useAuth();

  return user?.email ? <>{element}</> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
