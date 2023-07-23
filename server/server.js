// Setting up of backend server + connect to DB
const { app } = require("./app");

// auth of user Middleware
const { auth } = require("./middleware/auth");

// Routes Middleware
const authentication = require("./routes/authentication");
const updateAssets = require("./routes/updateassets");
const dashboard = require("./routes/dashboard");
const portfolio = require("./routes/portfolio");
const profile = require("./routes/profile");
const transactions = require("./routes/transactions");
// -----------------------------------------------------------------------------------

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

// Login + Register Route
app.use("/", authentication);

// Update Assets Route
app.use("/update-assets", updateAssets);

// Dashboard Rpute
app.use("/dashboard", dashboard);

// Portfolio Route
app.use("/portfolio", portfolio);

// Profile Route
app.use("/profile", profile);

// Transactions Route
app.use("/transactions", transactions);

// ensure port is up and running
app.listen(3000, () => {
  console.log("Server started.");
});
