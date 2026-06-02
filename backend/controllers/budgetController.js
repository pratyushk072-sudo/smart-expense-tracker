const Budget = require("../models/Budget");

// GET BUDGET
const getBudget = async (req, res) => {
  try {

    const month = Number(req.query.month);
    const year = Number(req.query.year);

    console.log("GET:", month, year);

    const budget = await Budget.findOne({
      user: req.user.id,
      month,
      year,
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

    console.log("BODY:", req.body);

    const month = Number(req.body.month);
    const year = Number(req.body.year);

    let budget = await Budget.findOne({
      user: req.user.id,
      month,
      year,
    });

    if (budget) {

      budget.amount = Number(req.body.monthlyBudget);

      await budget.save();

    } else {

      budget = await Budget.create({
        user: req.user.id,
        month,
        year,
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