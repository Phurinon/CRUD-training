const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/db");
const { User } = require("../models/user");
const { Address } = require("../models/address");

router.get("/list", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const data = await req.body;
    const userId = await req.params.id;
    const user = await User.update(
      {
        name: data.name,
        email: data.email,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    for (let i = 0; i < data.addresses.length; i++) {
      let cAddressData = data.addresses[i][i];
      cAddressData.userId = userId;
      const address = await Address.upsert(cAddressData);
    }

    res.json({
      message: "update complete!",
      user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    const userId = await req.params.id;
    const result = await User.destroy({
      where: { id: userId },
    });

    res.json({
      message: "delete successful",
      result,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
