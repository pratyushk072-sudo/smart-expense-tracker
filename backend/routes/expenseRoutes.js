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

// GET ALL EXPENSES OF LOGGED-IN USER
router.get("/", authMiddleware, async (req, res) => {
    try {

        const expenses = await Expense.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// DELETE EXPENSE
router.delete("/:id", authMiddleware, async (req, res) => {
    try {

        // find expense
        const expense = await Expense.findById(req.params.id);

        // check expense exists
        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        // check ownership
        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not authorized",
            });
        }

        // delete expense
        await expense.deleteOne();

        res.status(200).json({
            message: "Expense deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;