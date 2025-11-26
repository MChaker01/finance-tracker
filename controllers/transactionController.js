const Transaction = require("../models/Transaction");

// CREATE new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, transactionType, category, description, date } = req.body;

    // Validate required fields (date is optional - has default in model)
    if (!amount || !transactionType || !category) {
      return res.status(400).json({
        message: "Required fields missing (amount, type, category).",
      });
    }

    // Create transaction and link to authenticated user
    const transaction = await Transaction.create({
      amount,
      transactionType,
      category,
      description,
      date,
      user: req.user.id, // From auth middleware
    });

    res.status(201).json({
      message: "Transaction created successfully.",
      transaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ 
      message: "Error creating transaction", 
      error: error.message 
    });
  }
};

// GET single transaction by ID
const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    // Check if transaction exists
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Verify ownership
    if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden. Not your transaction." });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.error("Error retrieving transaction:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// GET all transactions for authenticated user
const getAllTransactions = async (req, res) => {
  try {
    // filter transactions by user - and returns user's transactions
    const allTransactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 }); // Sort by date, newest first

    // Empty array is valid - not an error
    if (allTransactions.length === 0) {
      return res.status(200).json({
        message: "No transactions yet.",
        transactions: []
      });
    }

    return res.status(200).json(allTransactions);
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE existing transaction
const updateTransaction = async (req, res) => {
  try {
    // First, find the transaction to verify ownership
    const transactionToUpdate = await Transaction.findById(req.params.id);

    if (!transactionToUpdate) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    // Verify ownership before updating
    if (transactionToUpdate.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden. Not your transaction.",
      });
    }

    // Update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // Return updated document
        runValidators: true // Validate against schema
      }
    );

    res.status(200).json({
      message: "Transaction updated successfully.",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error while updating transaction:", error);
    return res.status(500).json({
      message: "Server error while updating transaction",
      error: error.message,
    });
  }
};

// DELETE transaction
const deleteTransaction = async (req, res) => {
  try {
    // Find transaction to verify ownership
    const transactionToDelete = await Transaction.findById(req.params.id);

    if (!transactionToDelete) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    // Verify ownership before deleting
    if (transactionToDelete.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden. Not your transaction." });
    }

    // Delete the transaction
    await transactionToDelete.deleteOne();

    // Send success response
    res.status(200).json({
      message: "Transaction deleted successfully."
    });
  } catch (error) {
    console.error("Error while deleting transaction:", error);
    res.status(500).json({
      message: "Server error while deleting transaction.",
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
};