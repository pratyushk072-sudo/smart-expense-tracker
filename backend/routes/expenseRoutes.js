const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getBudget,
  updateBudget,
} = require("../controllers/expenseController");

const router = express.Router();


// EXPENSE ROUTES
router.post("/", authMiddleware, createExpense);

router.get("/", authMiddleware, getExpenses);

router.delete("/:id", authMiddleware, deleteExpense);

router.put("/:id", authMiddleware, updateExpense);


// BUDGET ROUTES
router.get("/budget", authMiddleware, getBudget);

router.put("/budget", authMiddleware, updateBudget);


module.exports = router;