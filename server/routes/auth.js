const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../models/user");
const logger = require("../logger"); // นำเข้า logger

// Route สำหรับ register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    if (!email) {
      logger.warn("POST /register - Email is required");
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      logger.warn("POST /register - Password is required");
      return res.status(400).json({ message: "Password is required" });
    }

    // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      logger.warn(`POST /register - Email already exists: ${email}`);
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่
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

    logger.info(`POST /register - User created: ${createUser.id}`);
    res.status(201).json({ token });
  } catch (err) {
    logger.error("POST /register - Error: " + err.message, err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route สำหรับ login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ค้นหาผู้ใช้จากอีเมล
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      logger.warn(`POST /login - Invalid email: ${email}`);
      return res.status(401).json({ message: "Invalid email" });
    }

    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`POST /login - Invalid password for email: ${email}`);
      return res.status(401).json({ message: "Password doesn't match" });
    }

    const payload = {
      id: user.id,
      isAdmin: user.isAdmin,
      email: user.email,
    };

    // สร้าง token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          logger.error("POST /login - JWT error", err);
          return res.status(404).json({ message: "User not found" });
        }
        logger.info(`POST /login - User logged in: ${user.id}`);
        res.json({ payload, token, id: user.id });
      }
    );
  } catch (err) {
    logger.error("POST /login - Error: " + err.message, err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route สำหรับ check email
router.get("/check-email", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    logger.info(
      `GET /check-email - Email checked: ${email} - Exists: ${!!user}`
    );
    res.json({ exists: !!user });
  } catch (err) {
    logger.error("GET /check-email - Error: " + err.message, err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
