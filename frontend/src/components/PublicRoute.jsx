import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  // 1. Get auth data
  const { user, token } = useAuth();

  if (user && token) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default PublicRoute;
