const express = require('express');
const router = express.Router();

// User Authentication Middleware
const { auth } = require("../middleware/auth");

const User = require('../schemas/User');
const CTransaction = require('../schemas/CurrencyTransaction');
const STransaction = require('../schemas/StockTransaction');

// POST request to update Currency data
router.post('/currency/confirmation', auth, async(req, res) => {
  try {
    const user = await User.findById(req.userId);

    const transactionType = req.body.transactionType;
    const sellCurrency = req.body.sellCurrency;
    const sellAmount = req.body.sellAmount;
    const buyCurrency = req.body.buyCurrency;
    const buyAmount = req.body.buyAmount;
    const fees = req.body.fees;

    // Create new transaction entry
    await CTransaction.create({
      user: user._id,

      transactionType: transactionType,
      sellCurrency: sellCurrency,
      sellAmount: sellAmount,
      buyCurrency: buyCurrency,
      buyAmount: buyAmount,
      fees: fees
    });

    return res.status(200).send("Data sent to database.");
  } catch(error) {
    res.status(500).json({error : "An error occured."});
  }
})

// POST request to update Stock data
router.post('/stock/confirmation', auth, async(req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    const transactionType = req.body.transactionType;
    const sector = req.body.sector;
    const equity = req.body.equity;
    const ticker = req.body.ticker;
    const currency = req.body.currency;

    const price = req.body.price;
    const shares = req.body.shares;
    const fees = req.body.fees;

    // Create new transaction entry
    await STransaction.create({
      user: user._id,

      transactionType: transactionType,
      sector: sector,
      equity: equity,
      ticker: ticker,
      currency: currency,

      price: price,
      shares: shares,
      fees: fees
    });

    return res.status(200).send("Data sent to database.");
  } catch(error) {
    res.status(500).json({error : "An error occured."});
  }
})

module.exports = router;