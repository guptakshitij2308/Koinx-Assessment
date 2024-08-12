const express = require("express");
const router = express.Router();
const balanceController = require("../controller/balanceController");

router.post("/balance", balanceController.calculateBalance);

module.exports = router;
