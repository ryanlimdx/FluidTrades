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
