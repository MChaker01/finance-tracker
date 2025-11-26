const mongoose = require("mongoose");

// Define the Transaction schema
const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    transactionType: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is required"],
    },
    category: {
      type: String,
      // Restrict to predefined categories
      enum: [
        "Food",
        "Salary",
        "Transport",
        "Investment Income",
        "Rental Income",
        "SHOPPING",
        "HEALTHCARE",
        "Other",
      ],
      required: [true, "Category is required"],
      default: "Other",
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now, // Use current date/time if not provided
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: "User", // Link to the User collection
      required: [true, "user is required"], // Every transaction must belong to a user
    },
  },
  {
    timestamps: true,
  }
);

// Create the Transaction model
// "Transaction" becomes "transactions" collection in MongoDB
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
