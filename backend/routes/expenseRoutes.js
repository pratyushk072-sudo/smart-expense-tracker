const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE EXPENSE
router.post("/", authMiddleware, async (req, res) => {
  try {

    const { title, amount, category, date } = req.body;

    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      date,
    });

    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;