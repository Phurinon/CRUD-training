const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { sequelize } = require("../config/db");
const { User } = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    // if (!name) {
    //   return res.status(400).json({ message: "Username is required" });
    // }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Check if user exists
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const createUser = await User.create({
      name,
      email,
      age,
      role,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign({ userId: createUser.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log(createUser);
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // Generate token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ payload, token, id: user.id });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/check-email", async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  res.json({ exists: !!user });
});

module.exports = router;
