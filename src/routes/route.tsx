import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./Public";
import ProtectedRoute from "./Protected";
import NotFoundRoutes from "./NotFound";
import Starter from "../pages/starter";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Profile from "../pages/profile";

const AppRoutes: React.FC = () => {
  const routes = [
    // Public routes
    {
      path: "/auth/login",
      element: <PublicRoutes element={<Login />} />,
    },
    {
      path: "/auth/signup",
      element: <PublicRoutes element={<Signup />} />,
    },
    // Protected routes
    // Doing it for scalability- not applicable now
    {
      path: "/",
      element: <ProtectedRoute element={<Starter />} />,
      caseSensitive: true,
    },
    {
      path: "/profile",
      element: <ProtectedRoute element={<Profile />} />,
      caseSensitive: true,
    },

    // Not found routes
    { path: "*", element: <NotFoundRoutes /> },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
