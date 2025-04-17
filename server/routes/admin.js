const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const logger = require("../logger"); // นำเข้า logger

// Route สำหรับทำให้ user เป็น admin
router.post("/make-admin/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      logger.warn(
        `POST /make-admin/:id - User not found with id: ${req.params.id}`
      );
      return res.status(404).json({ message: "User not found" });
    }

    // เปลี่ยนสถานะเป็น admin
    user.isAdmin = "true";
    await user.save();

    // Log เมื่อทำการเปลี่ยนแปลงสำเร็จ
    logger.info(
      `POST /make-admin/:id - User with id: ${req.params.id} is now admin`
    );

    res.json({ message: "User is now admin", user });
  } catch (err) {
    // Log เมื่อเกิดข้อผิดพลาด
    logger.error(`POST /make-admin/:id - Error: ${err.message}`, err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

module.exports = router;
