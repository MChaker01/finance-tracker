const express = require("express");

// Import auth middleware to protect routes
const { protect } = require("../middleware/authMiddleware");

// Import transaction controller functions
const {
  createTransaction,
  getTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// Create router instance
const router = express.Router();

// Apply protect middleware to ALL routes below
// This means every route requires valid JWT token
router.use(protect);

// Route: /api/transaction/
// POST   - Create new transaction
// GET    - Get all transactions for logged-in user
router.route("/").post(createTransaction).get(getAllTransactions);

// Route: /api/transaction/:id
// GET    - Get single transaction by ID
// PUT    - Update transaction by ID
// DELETE - Delete transaction by ID
router
  .route("/:id")
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

// Export router to use in server.js
module.exports = router;
