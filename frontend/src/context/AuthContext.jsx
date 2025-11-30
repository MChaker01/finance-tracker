import { createContext, useContext, useState } from "react";
import { login as loginAPI, register as registerAPI } from "../utils/api";

// Create the Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  // Initialize state directly from localStorage (runs only once)
  // This is called "lazy initialization" - the function runs only on mount
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Register function
  const register = async (userData) => {
    // Call API and get response
    const response = await registerAPI(userData);
    // response = { message, username, email, token }

    // Create user object (without token)
    const userObject = {
      username: response.username,
      email: response.email,
    };

    // Update state
    setToken(response.token);
    setUser(userObject);

    // Save to localStorage for persistence
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(userObject));

    return response;
  };

  // Login function
  const login = async (credentials) => {
    // Call API and get response
    const response = await loginAPI(credentials);
    // response = { _id, username, email, token }

    // Create user object (without token)
    const userObject = {
      _id: response._id,
      username: response.username,
      email: response.email,
    };

    // Update state
    setToken(response.token);
    setUser(userObject);

    // Save to localStorage for persistence
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(userObject));

    return response;
  };

  // Logout function
  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login
    window.location.href = "/login";
  };

  // Value object containing all state and functions
  const value = {
    user,
    token,
    register,
    login,
    logout,
  };

  // Provide the value to all children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Error handling: ensure hook is used within Provider
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
