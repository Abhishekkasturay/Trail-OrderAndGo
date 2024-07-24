const express = require("express");
const router = express.Router();
const User = require("../models/User");

// User registration
router.post("/register", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Check if the username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).send("Username already exists");
    }

    // Create a new user
    const newUser = new User({ name, username, password });
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    res.send("Login successful");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
