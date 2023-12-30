import React from "react";
import { PathRouteProps } from "react-router-dom";

const PublicRoutes: React.FC<PathRouteProps> = ({ element }) => {
  return <>{element}</>;
};

export default PublicRoutes;
