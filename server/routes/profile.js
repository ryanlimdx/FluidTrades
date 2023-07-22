const express = require("express");
const router = express.Router();

// User Authentication Middleware
const { auth } = require("../middleware/auth")

const User = require("../schemas/User");

// GET request to fetch Profile data
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user === null) {
      return res.status(404).json({ message: "Profile cannot be found." });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.patch("/change_name", auth, async (req, res) => {
  try {
    if (req.body.name === null) {
      return res.status(400).json({ message: "Please input a name!" });
    }

    const user = await User.findById(req.userId);

    if (req.body.name === user.name) {
      return res.status(400).json({ message: "Please input a different name from your current name!" });
    } 

    if (!user) {
      return res.status(404).json({ message: "Server Error. Profile cannot be found. "});
    }

    user.name = req.body.name;
    await user.save();

    return res.status(200).json({ message: "Name successfully changed! ｡^‿^｡" });
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/change_email", auth, async (req, res) => {
  try {
    if (req.body.name === null) {
      return res.status(400).json({ message: "Please input an email!" });
    }

    const user = await User.findById(req.userId);

    if (req.body.email === user.email) {
      return res.status(400).json({ message: "Please input a different email from your current email!" });
    } 

    if (!user) {
      return res.status(404).json({ message: "Server Error. Profile cannot be found. "});
    }

    user.email = req.body.email;
    await user.save();

    return res.status(200).json({ message: "Email successfully changed! ｡^‿^｡" });
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;