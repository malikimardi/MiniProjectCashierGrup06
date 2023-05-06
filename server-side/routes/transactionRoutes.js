const express = require("express");
const { transactionController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, transactionController.addTransaction);
router.get("/", verifyToken, transactionController.fetchAllTransaction);

module.exports = router;
