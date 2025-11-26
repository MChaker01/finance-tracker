const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file
const connectDB = require("./config/db");

// Import route handlers
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Initialize Express application
const app = express();

// MIDDLEWARE SETUP
// Parse incoming JSON data in request body
app.use(express.json());

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend (React) to communicate with backend (Express)
// Only allows requests from CLIENT_URL or defaults to localhost:5173
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

// ROUTE MOUNTING
// All routes starting with /api/user/ will use authRoutes
// Example: POST /api/user/register, POST /api/user/login
app.use("/api/user/", authRoutes);

// All routes starting with /api/transaction/ will use transactionRoutes
// Example: GET /api/transaction/, POST /api/transaction/, etc.
app.use("/api/transaction/", transactionRoutes);

// DATABASE CONNECTION & SERVER START
// First connect to MongoDB, then start the server
connectDB().then(() => {
  // Get port from environment variable or default to 3000
  const PORT = process.env.PORT || 3000;

  // Start listening for incoming requests
  app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});
