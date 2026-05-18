const Budget = require("../models/Budget");

// GET BUDGET
const getBudget = async (req, res) => {
  try {

    const currentDate = new Date();

    const budget = await Budget.findOne({
      user: req.user.id,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    });

    res.json({
      monthlyBudget: budget ? budget.amount : 0,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE BUDGET
const updateBudget = async (req, res) => {
  try {

    const currentDate = new Date();

    let budget = await Budget.findOne({
      user: req.user.id,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    });

    if (budget) {

      budget.amount = Number(req.body.monthlyBudget);

      await budget.save();

    } else {

      budget = await Budget.create({
        user: req.user.id,
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        amount: Number(req.body.monthlyBudget),
      });

    }

    res.json({
      monthlyBudget: budget.amount,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getBudget,
  updateBudget,
};