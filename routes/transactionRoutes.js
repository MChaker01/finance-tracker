const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createTransaction,
  getTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.use(protect);

router.route("/").post(createTransaction).get(getAllTransactions);

router
  .route("/:id")
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
