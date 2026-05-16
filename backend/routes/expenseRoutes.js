const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
} = require("../controllers/expenseController");

const router = express.Router();


// CREATE EXPENSE
router.post("/", authMiddleware, createExpense);


// GET ALL EXPENSES
router.get("/", getExpenses);


// DELETE EXPENSE
router.delete("/:id", authMiddleware, deleteExpense);


// UPDATE EXPENSE
router.put("/:id", authMiddleware, updateExpense);


module.exports = router;