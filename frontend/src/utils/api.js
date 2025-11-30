import axios from "axios";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor - Runs BEFORE every request
api.interceptors.request.use(
  function (config) {
    // Get JWT token from localStorage (synchronous - no await needed)
    const token = localStorage.getItem("token");

    // Only attach token if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor - Runs AFTER every response
api.interceptors.response.use(
  function (response) {
    // Return only the data part of the response (cleaner for components)
    return response.data;
  },
  function (error) {
    // Only handle 401 Unauthorized errors (token expired/invalid)
    if (error.response?.status === 401) {
      // Clear authentication data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// ============================================
// USER API FUNCTIONS
// ============================================

// Register new user
export const register = async (userData) => {
  return api.post("/user/register", userData);
};

// Login existing user
export const login = async (credentials) => {
  return api.post("/user/login", credentials);
};

// ============================================
// TRANSACTION API FUNCTIONS
// ============================================

// Create new transaction
export const createTransaction = async (formData) => {
  return api.post("/transaction/", formData);
};

// Get all user's transactions
export const getAllTransactions = async () => {
  return api.get("/transaction/");
};

// Get single transaction by ID
export const getTransaction = async (transactionId) => {
  return api.get(`/transaction/${transactionId}`);
};

// Update transaction
export const updateTransaction = async (transactionId, updatedData) => {
  return api.put(`/transaction/${transactionId}`, updatedData);
};

// Delete transaction
export const deleteTransaction = async (transactionId) => {
  return api.delete(`/transaction/${transactionId}`);
};
