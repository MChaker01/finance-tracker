const express = require("express");

// Import controller functions
const { register, login } = require("../controllers/authController");

// Create a new router instance
const router = express.Router();

// POST /api/user/register - Create new user account
router.post("/register", register);

// POST /api/user/login - Authenticate user and get token
router.post("/login", login);

// Export router to be used in server.js
module.exports = router;
