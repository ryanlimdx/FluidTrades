// Setting up of backend server + connect to DB
const { app  } = require("./app");

// auth of user Middleware
const { auth } = require("./middleware/auth");

// Routes Middleware
const authentication = require("./routes/authentication");
const updateAssets = require("./routes/updateassets");

// ---------------------------------------------------------------------------------
const User = require('./schemas/User');

// GET request to fetch Profile data
app.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user === null) {
      return res.status(404).json({ message: "Profile cannot be found." });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
})

// -----------------------------------------------------------------------------------
const STransaction = require('./schemas/StockTransaction');
// GET request to retrieve stock transactions data
app.get("/stocktransactions", auth, async(req, res) => {
  try {
    const user = await User.findById(req.userId);
    const stockTxns = await STransaction.find({user: user});
    return res.status(200).json(stockTxns);
  } catch (error) {
    console.log(error);
  }
});

const CTransaction = require('./schemas/CurrencyTransaction');
// GET request to retrieve currency transactions data
app.get("/currencytransactions", auth, async(req, res) => {
  try {
    const user = await User.findById(req.userId);
    const currencyTxns = await CTransaction.find({user: user});
    return res.status(200).json(currencyTxns);
  } catch (error) {
    console.log(error);
  }
});

const Stock = require('./schemas/Stock');
// GET request to retrieve stock data
app.get("/stocks", auth, async(req, res) => {
  try {
    const user = await User.findById(req.userId);
    const stocks = await Stock.find({user: user});
    return res.status(200).json(stocks);
  } catch (error) {
    console.log(error);
  }
});

const Currency = require('./schemas/Currency');
// GET request to retrieve currency data
app.get("/currencies", auth, async(req, res) => {
  try {
    const user = await User.findById(req.userId);
    const currencies = await Currency.find({user: user});
    return res.status(200).json(currencies);
  } catch (error) {
    console.log(error);
  }
});


// --------------------------------------------------------------------------

// Login + Register Middleware
app.use('/', authentication);

// Update Assets Middleware
app.use('/update-assets', updateAssets);

// ensure port is up and running
app.listen(3000, () => {
  console.log("Server started.");
}) 