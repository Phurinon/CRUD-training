const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/db");
const { User } = require("../models/user");
const { Address } = require("../models/address");
const { auth } = require("../Middleware/auth");

router.get("/list", auth, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error fetching users",
      errors: err.errors.map((e) => e.message),
    });
  }
});

router.get("/listBy/:id", async (req, res) => {
  try {
    const userId = await req.params.id;
    if (!userId) {
      return res.json({
        message: "userId is required",
      });
    }

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error fetching users",
      errors: err.errors.map((e) => e.message),
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error creating user",
      errors: err.errors.map((e) => e.message),
    });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const data = await req.body;
    const userId = await req.params.id;
    const user = await User.update(
      {
        name: data.name,
        age: data.age,
        role: data.role,
        gender: data.gender,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    // for (let i = 0; i < data.addresses.length; i++) {
    //   let cAddressData = data.addresses[i][i];
    //   cAddressData.userId = userId;
    //   const address = await Address.upsert(cAddressData);
    // }

    res.json({
      message: "update complete!",
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error updating user",
      errors: err.errors.map((e) => e.message),
    });
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const userId = await req.params.id;
    if (!userId) {
      return res.json({
        message: "userId is required",
      });
    }
    const result = await User.destroy({
      where: { id: userId },
    });

    res.json({
      message: "delete successful",
      result,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error deleting user",
      errors: err.errors.map((e) => e.message),
    });
  }
});

module.exports = router;
