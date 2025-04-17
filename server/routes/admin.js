const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.post("/make-admin/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = "true";
    await user.save();

    res.json({ message: "User is now admin", user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

module.exports = router;
