const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER - Create new user account
const register = async (req, res) => {
  try {
    // Extract data from request body
    const { username, email, password } = req.body;

    // Validate that all required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if username already exists in database
    const usernameExists = await User.findOne({ username });
    // Check if email already exists in database
    const emailExists = await User.findOne({ email });

    // Return error if username is taken
    if (usernameExists) {
      return res.status(409).json({ message: "username already exists" });
    }

    // Return error if email is taken
    if (emailExists) {
      return res.status(409).json({ message: "email already exists" });
    }

    // Hash the password for security (never store plain text passwords!)
    // 10 is the salt rounds (higher = more secure but slower)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database with hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // If user created successfully, generate JWT token
    if (newUser) {
      // Sign token with user ID as payload
      // Token expires in 3 days
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      // Send success response with user data and token
      return res.status(201).json({
        message: "User created successfully.",
        username: newUser.username,
        email: newUser.email,
        token, // Frontend will store this for authentication
      });
    }
  } catch (error) {
    console.error("Server Error while registration.", error);
    res.status(500).json({
      message: "Server Error while registration, Please Try Again Later",
    });
  }
};

// LOGIN - Authenticate existing user
const login = async (req, res) => {
  try {
    // Extract credentials from request body
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by username
    const user = await User.findOne({ username });

    // If user doesn't exist, return error immediately
    // (prevents trying to compare password when user is null)
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    // Compare provided password with hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    // If credentials are valid, generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Send success response with user data and token
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token, // Frontend will use this for subsequent authenticated requests
    });
  } catch (error) {
    console.error("Server Error while login.", error);
    res.status(500).json({
      message: "Server Error while login, Please Try Again Later",
    });
  }
};

module.exports = { register, login };
