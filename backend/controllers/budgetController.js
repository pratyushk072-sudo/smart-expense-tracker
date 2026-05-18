const Budget = require("../models/Budget");


// SET MONTHLY BUDGET
const setBudget = async (req, res) => {

  try {

    const { month, year, amount } = req.body;

    let budget = await Budget.findOne({
      user: req.user.id,
      month,
      year,
    });

    if (budget) {

      budget.amount = amount;

      await budget.save();

      return res.json(budget);
    }

    budget = await Budget.create({
      user: req.user.id,
      month,
      year,
      amount,
    });

    res.status(201).json(budget);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET CURRENT BUDGET
const getBudget = async (req, res) => {

  try {

    const { month, year } = req.query;

    const budget = await Budget.findOne({
      user: req.user.id,
      month,
      year,
    });

    res.json(budget);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  setBudget,
  getBudget,
};