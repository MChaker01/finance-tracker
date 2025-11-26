const mongoose = require("mongoose");

// Define the User schema - blueprint for user documents in MongoDB
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is required"],
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      match: [/.+@.+\..+/, "Please enter a valid email"], // Regex validation
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model from the schema
// "User" will become the "users" collection in MongoDB
const User = mongoose.model("User", userSchema);

module.exports = User;
