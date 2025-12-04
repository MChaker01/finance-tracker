import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  // 1. Get auth data
  const { user, token } = useAuth();

  if (user && token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
