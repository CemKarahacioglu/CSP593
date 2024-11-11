// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register User Endpoint
router.post("/signup", userController.registerUser);

// Login User
router.post("/login", userController.loginUser);

module.exports = router;
