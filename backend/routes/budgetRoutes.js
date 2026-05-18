const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  setBudget,
  getBudget,
} = require("../controllers/budgetController");

const router = express.Router();


// SET BUDGET
router.post(
  "/",
  authMiddleware,
  setBudget
);


// GET BUDGET
router.get(
  "/",
  authMiddleware,
  getBudget
);

module.exports = router;