const mongoose = require("mongoose");

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
      match: [/.+@.+\..+/, "Please enter a valid email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
