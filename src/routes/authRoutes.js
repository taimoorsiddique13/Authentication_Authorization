const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const path = require("path");

const checkSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Please login to continue" });
  }
  next();
};

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    req.session.userId = user._id;
    req.session.username = user.username;

    res.status(200).json({
      message: "Login successful",
      sessionExpiry: new Date(Date.now() + 30000).toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

router.get("/greeting", checkSession, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/greeting.html"));
});

router.get("/check-session", (req, res) => {
  if (req.session.userId) {
    res.json({
      isValid: true,
      username: req.session.username,
      expiresAt: req.session.cookie.expires,
    });
  } else {
    res.json({ isValid: false });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
