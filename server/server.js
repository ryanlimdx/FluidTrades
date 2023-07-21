// Setting up of backend server + connect to DB
const { app } = require("./app");

// auth of user Middleware
const { auth } = require("./middleware/auth");

// Set up market data API
const axios = require('axios');

// Routes Middleware
const authentication = require("./routes/authentication");
const updateAssets = require("./routes/updateassets");
const dashboard = require("./routes/dashboard");
const portfolio = require("./routes/portfolio");

// ---------------------------------------------------------------------------------
const User = require("./schemas/User");

// GET request to fetch Profile data
app.get("/profile", auth, async (req, res) => {
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

// -----------------------------------------------------------------------------------
const STransaction = require("./schemas/StockTransaction");
const CryptoTransaction = require("./schemas/CryptoTransaction");
// GET request to retrieve stock transactions data
app.get("/assettransactions", auth, async (req, res) => {
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

const CTransaction = require("./schemas/CurrencyTransaction");
// GET request to retrieve currency transactions data
app.get("/currencytransactions", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const currencyTxns = await CTransaction.find({ user: user });
    return res.status(200).json(currencyTxns);
  } catch (error) {
    console.log(error);
  }
});

// const CryptoTransaction = require("./schemas/CryptoTransaction");
// app.get("/cryptotransactions", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);
//     const cryptotxns = await CryptoTransaction.find({ user: user });
//     return res.status(200).json(cryptoTxns);
//   } catch (error) {
//     console.log(error);
//   }
// });

// --------------------------------------------------------------------------

// Login + Register Middleware
app.use("/", authentication);

// Update Assets Middleware
app.use("/update-assets", updateAssets);

// Dashboard Middleware
app.use("/dashboard", dashboard);

// Portfolio Middleware
app.use("/portfolio", portfolio);;

// ensure port is up and running
app.listen(3000, () => {
  console.log("Server started.");
});
