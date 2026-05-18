const Expense = require("../models/Expense");


// CREATE EXPENSE
const createExpense = async (req, res) => {
    try {

        const { title, amount, category, date } = req.body;

        const expense = new Expense({
            user: "6a073033bf86ed9cbdb4f0c8",
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
};


// GET ALL EXPENSES
const getExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find();
  
      res.json(expenses);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await expense.deleteOne();

    res.json({
      message: "Expense deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE EXPENSE
const updateExpense = async (req, res) => {
    try {

        const { title, amount, category, date } = req.body;

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

        // update expense
        expense.title = title || expense.title;
        expense.amount = amount || expense.amount;
        expense.category = category || expense.category;
        expense.date = date || expense.date;

        const updatedExpense = await expense.save();

        res.status(200).json(updatedExpense);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {
    createExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
};