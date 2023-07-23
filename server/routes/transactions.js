const express = require("express");
const router = express.Router();

// User Authentication Middleware
const { auth } = require("../middleware/auth");

const User = require("../schemas/User");
const STransaction = require("../schemas/StockTransaction");
const CryptoTransaction = require("../schemas/CryptoTransaction");
const CTransaction = require("../schemas/CurrencyTransaction");

// GET request to retrieve stock transactions data
router.get("/asset", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const stockTxns = await STransaction.find({ user: user });
    const cryptoTxns = await CryptoTransaction.find({ user: user });
    const assetTxns = stockTxns.concat(cryptoTxns);
    return res.status(200).json(assetTxns);
  } catch (error) {
    console.log(error);
  }
});

// GET request to retrieve currency transactions data
router.get("/currency", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const currencyTxns = await CTransaction.find({ user: user });
    return res.status(200).json(currencyTxns);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;