const express = require("express");
const router = express.Router();
const User = require("../models/db");
const auth = require("../middleware/middleware")
const roleauth = require("../middleware/roleauth")

const UserBehavior = require('../models/userBehavior');

router.get("/users", [auth,roleauth(["admin"])], async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

router.put("/user/:id", [auth,roleauth(["admin"])], async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get('/behavior', async (req, res) => {
  try {
      const behaviors = await UserBehavior.find().sort({ timestamp: -1 });
      res.json(behaviors);
  } catch (err) {
      res.status(500).json({ message: 'Error retrieving behavior data', err });
  }
});

module.exports = router;
