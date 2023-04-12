const express = require("express");
const { authController } = require("../controllers");

const router = express.Router();

router.post("/", authController.register);
router.post("/login", authController.login);
router.post("/check-login", authController.checkLogin);
router.get("/user", authController.fetchAllUser);
router.get("/user/:id", authController.fetchUser);

module.exports = router;
