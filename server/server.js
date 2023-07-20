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

const Stock = require("./schemas/Stock");
const Crypto = require("./schemas/Crypto")
// GET request to retrieve asset data
app.get("/assets", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    // For combining crypto data
    // var jsonArray1 = [{'name': "doug", 'id':5}, {'name': "dofug", 'id':23}];
    // var jsonArray2 = [{'name': "goud", 'id':1}, {'name': "doaaug", 'id':52}];
    // jsonArray1 = jsonArray1.concat(jsonArray2);
    const stocks = await Stock.find({ user: user }).lean();
    const cryptos = await Crypto.find({ user: user }).lean();
    const assets = stocks.concat(cryptos);

    for await (let item of assets) {
      item.breakevenPrice = item.investedCapital / item.quantity;
      if (item.investedCapital < 0) {
        item.investedCapital = 0
      }

      const options = {
        method: "GET",
        url: "https://twelve-data1.p.rapidapi.com/price",
        params: {
          symbol: item.sector === "Cryptocurrency" ? item.ticker + "/" + item.currency : item.ticker,
          format: "json",
          outputsize: "30",
        },
        headers: {
          // "X-RapidAPI-Key": "1c8bce9d54msh8cbc95c564f2621p11f793jsnd17079bce2af",
          'X-RapidAPI-Key': '673bac560cmshacd917fc1467ce3p17a520jsn9a4dc632f02a',
          "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
        },
      };

      try {
        // Another approach to go around the API limit would be: 
        //   1. Set timeout
        //   2. Put the API in frontend to re render once the API can call again
        const priceResponse = await axios.request(options);
        const price = priceResponse.data.price;
        item.currPrice = price;
        item.marketValue = price * item.quantity
        item.returns = item.marketValue - item.investedCapital
        if (item.investedCapital == 0) {
          item.returnsPCT = "∞"
        } else {
          item.returnsPCT = item.returns / item.investedCapital * 100
        }
        
      } catch (error) {
        item.currPrice = "API limit exceeded";
        item.marketValue = "API limit exceeded";
        item.returns = "API limit exceeded";
        item.returnsPCT = "API limit exceeded";
      }
    }

    return res.status(200).send(JSON.stringify(assets));
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error: 500");
  }
});

const Currency = require("./schemas/Currency");
// GET request to retrieve currency data
app.get("/currencies", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const currencies = await Currency.find({ user: user });
    return res.status(200).json(currencies);
  } catch (error) {
    console.log(error);
  }
});

// --------------------------------------------------------------------------

// Login + Register Middleware
app.use("/", authentication);

// Update Assets Middleware
app.use("/update-assets", updateAssets);

// Portfolio Middleware
app.use("/dashboard", dashboard);

// ensure port is up and running
app.listen(3000, () => {
  console.log("Server started.");
});
