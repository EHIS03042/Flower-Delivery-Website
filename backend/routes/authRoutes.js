// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/authController");

// ✅ POST /api/auth/register - Register new user
router.post("/register", registerUser);

// ✅ POST /api/auth/login - Login existing user
router.post("/login", loginUser);

module.exports = router;
