import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const RootRedirect = () => {
  const { user, token } = useAuth();

  if (user && token) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RootRedirect;
