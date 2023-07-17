const express = require("express");
const router = express.Router();

// User Authentication Middleware
const { auth } = require("../middleware/auth");

const User = require("../schemas/User");
const CTransaction = require("../schemas/CurrencyTransaction");
const STransaction = require("../schemas/StockTransaction");
const Currency = require("../schemas/Currency");
const Stock = require("../schemas/Stock");

// POST request to update Currency data
router.post("/currency/confirmation", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const transactionType = req.body.transactionType;
    const sellCurrency = req.body.sellCurrency;
    const sellAmount = req.body.sellAmount;
    const buyCurrency = req.body.buyCurrency;
    const buyAmount = req.body.buyAmount;
    const fees = req.body.fees;
    const exchangeRate = req.body.exchangeRate;

    // Create new transaction entry
    await CTransaction.create({
      user: user._id,

      transactionType: transactionType,
      sellCurrency: sellCurrency,
      sellAmount: sellAmount,
      buyCurrency: buyCurrency,
      buyAmount: buyAmount,
      fees: fees,
      exchangeRate: exchangeRate,
    });
    
    // Create a new currency for record purposes. If already exists, patch the data.
    if (transactionType === "Deposit") {
      await Currency.findOneAndUpdate(
        { currency: sellCurrency, user: user._id, },
        {
          $inc: {
            balance: sellAmount - fees,
          },
  
          $setOnInsert: {
            user: user._id,
            currency: sellCurrency,
          },
        },
        { upsert: true }
      );

    } else if (transactionType === "Withdraw") {
      await Currency.findOneAndUpdate(
        { currency: sellCurrency, user: user._id, },
        {
          $inc: {
            balance: - sellAmount - fees,
          },
  
          $setOnInsert: {
            user: user._id,
            currency: sellCurrency,
          },
        },
        { upsert: true }
      );
    } else {
      // From this currency
      await Currency.findOneAndUpdate(
        { currency: sellCurrency, user: user._id, },
        {
          $inc: {
            balance: - sellAmount - fees,
          },
  
          $setOnInsert: {
            user: user._id,
            currency: sellCurrency,
          },
        },
        { upsert: true }
      );
      
      // To this currency
      await Currency.findOneAndUpdate(
        { currency: buyCurrency, user: user._id, },
        {
          $inc: {
            balance: buyAmount,
          },
  
          $setOnInsert: {
            user: user._id,
            currency: buyCurrency,
          },
        },
        { upsert: true }
      );
    }

    return res.status(200).send("Data successfully sent to database.");
  } catch (error) {
    res.status(500).json({ error: "An error occured." });
  }
});

// POST request to update Stock data
router.post("/stock/confirmation", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const transactionType = req.body.transactionType;
    const sector = req.body.sector;
    const equity = req.body.equity;
    const ticker = req.body.ticker;
    const currency = req.body.currency;

    const price = req.body.price;
    let shares = parseFloat(req.body.shares);
    if (transactionType === "Sell") {
      shares = -shares;
    }
    const fees = req.body.fees;

    const investedCapital = price * shares + fees;

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
      fees: fees,
    });

    // Create a new stock for record purposes. If already exists, patch the data.
    await Stock.findOneAndUpdate(
      { ticker: ticker, user: user._id, },
      {
        $inc: {
          shares: shares,
          investedCapital: investedCapital,
        },

        $setOnInsert: {
          user: user._id,

          sector: sector,
          equity: equity,
          ticker: ticker,
          currency: currency,
        },
      },
      { upsert: true }
    );

    // Update currency records after transaction
    await Currency.findOneAndUpdate(
      { currency: currency, user: user._id, },
      {
        $inc: {
          balance: -investedCapital,
        },

        $setOnInsert: {
          user: user._id,
          currency: currency,
        },
      },
      { upsert: true }
    );

    return res.status(200).send("Data successfully sent to database.");
  } catch (error) {
    res.status(500).json({ error: "An error occured." });
  }
});

module.exports = router;
