const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getBudget,
  updateBudget,
} = require("../controllers/budgetController");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getBudget
);

router.put(
  "/",
  authMiddleware,
  updateBudget
);

module.exports = router;