import { AuthProvider } from "context";
import React from "react";
import { PathRouteProps } from "react-router-dom";

interface ProtectedRouteProps extends PathRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>;
};

export default ProtectedRoute;
