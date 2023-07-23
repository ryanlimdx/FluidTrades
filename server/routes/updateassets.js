const express = require("express");
const router = express.Router();

// User Authentication Middleware
const { auth } = require("../middleware/auth");

const User = require("../schemas/User");
const CTransaction = require("../schemas/CurrencyTransaction");
const STransaction = require("../schemas/StockTransaction");
const CryptoTransaction = require("../schemas/CryptoTransaction");
const Currency = require("../schemas/Currency");
const Stock = require("../schemas/Stock");
const Crypto = require("../schemas/Crypto");

// POST request to update Currency data
router.post("/currency/confirmation", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const transactionType = req.body.transactionType;
    const sellCurrency = req.body.sellCurrency;
    const sellAmount = Number(req.body.sellAmount);
    
    const buyCurrency = req.body.buyCurrency;
    let buyAmount = req.body.buyAmount;
    if (buyAmount) { buyAmount = Number(req.body.buyAmount); }
    let commissions = req.body.commissions;
    if (commissions) { commissions = Number(req.body.commissions); }
    let exchangeRate = req.body.exchangeRate;
    if (exchangeRate) { exchangeRate = Number(req.body.exchangeRate); }

    // Create new transaction entry
    await CTransaction.create({
      user: user._id,

      transactionType: transactionType,
      sellCurrency: sellCurrency,
      sellAmount: sellAmount,
      buyCurrency: buyCurrency,
      buyAmount: buyAmount,
      commissions: commissions,
      exchangeRate: exchangeRate,
    });
    
    // Create a new currency for record purposes. If already exists, patch the data.
    if (transactionType === "Deposit") {
      await Currency.findOneAndUpdate(
        { currency: sellCurrency, user: user._id, },
        {
          $inc: {
            balance: sellAmount - commissions,
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
            balance: - sellAmount - commissions,
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
            balance: - sellAmount - commissions,
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

    await Currency.findOneAndDelete({user: user._id, balance: 0});

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
    const security = req.body.security;
    const ticker = req.body.ticker;
    const currency = req.body.currency;

    const price = Number(req.body.price);
    let quantity = Number(req.body.quantity);
    if (transactionType === "Sell") {
      quantity = -quantity;
    }
    let commissions = req.body.commissions;
    if (commissions) { // only turn into number if commissions is entered
      commissions = Number(commissions);
    }

    const investedCapital = price * quantity;

    // Create new transaction entry
    await STransaction.create({
      user: user._id,

      transactionType: transactionType,
      sector: sector,
      security: security,
      ticker: ticker,
      currency: currency,

      price: price,
      quantity: quantity,
      commissions: commissions,
    });

    // Create a new stock for record purposes. If already exists, patch the data.
    await Stock.findOneAndUpdate(
      { ticker: ticker, user: user._id, currency: currency },
      {
        $inc: {
          quantity: quantity,
          investedCapital: investedCapital,
        },

        $setOnInsert: {
          user: user._id,

          sector: sector,
          security: security,
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
          balance: - investedCapital - commissions,
        },

        $setOnInsert: {
          user: user._id,
          currency: currency,
        },
      },
      { upsert: true }
    );

    await Stock.findOneAndDelete({user: user._id, quantity: 0});
    await Currency.findOneAndDelete({user: user._id, balance: 0});

    return res.status(200).send("Data successfully sent to database.");
  } catch (error) {
    res.status(500).json({ error: "An error occured." });
  }
});

// POST request to update Crypto data
router.post("/crypto/confirmation", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const transactionType = req.body.transactionType;
    const sector = req.body.sector;
    const security = req.body.security;
    const ticker = req.body.ticker;
    const currency = req.body.currency;

    const price = Number(req.body.price);
    let quantity = Number(req.body.quantity);
    if (transactionType === "Sell") {
      quantity = -quantity;
    }
    let commissions = req.body.commissions;
    if (commissions) { // only turn into number if commissions is entered
      commissions = Number(commissions);
    }

    const investedCapital = price * quantity;

    // Create new transaction entry
    await CryptoTransaction.create({
      user: user._id,

      transactionType: transactionType,
      sector: sector,
      security: security,
      ticker: ticker,
      currency: currency,

      price: price,
      quantity: quantity,
      commissions: commissions,
    });

    // Create a new crypto for record purposes. If already exists, patch the data.
    await Crypto.findOneAndUpdate(
      { ticker: ticker, user: user._id, currency: currency},
      {
        $inc: {
          quantity: quantity,
          investedCapital: investedCapital,
        },

        $setOnInsert: {
          user: user._id,

          sector: sector,
          security: security,
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
          balance: - investedCapital - commissions,
        },

        $setOnInsert: {
          user: user._id,
          currency: currency,
        },
      },
      { upsert: true }
    );

    await Crypto.findOneAndDelete({user: user._id, quantity: 0});
    await Currency.findOneAndDelete({user: user._id, balance: 0});

    return res.status(200).send("Data successfully sent to database.");
  } catch (error) {
    res.status(500).json({ error: "An error occured." });
  }
});

module.exports = router;