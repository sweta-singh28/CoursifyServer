const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/authController");

// ✅ Use controller functions directly
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
