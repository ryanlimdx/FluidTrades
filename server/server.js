/**
 * This file will be used to send requests for account creation and login purposes.
 */
// Setting up of backend server + connect to DB
const {app, db} = require("./app");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { createJWT } = require('./middleware/webtoken');
const { auth } = require("./middleware/auth");

app.use(cookieParser());

// ------------------------------------------------------------------------
const User = require('./schemas/User');

// POST request to register user into database
app.post('/register', async(req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password && name)) {
      return res.status(400).json({ message: "Your name, email and password are required!"})
    }
    
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.json({ messsage: 'A user with that email already exists.'})
    } else {
      var salt = bcrypt.genSaltSync(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      // Create new User
      await User.create({
        name: name,
        email: email,
        password: encryptedPassword
      })

      res.send({status : "ok"})
    }
  } catch(error) {
    res.status(500).json({error : "An error occured."});
  }
})

// POST request to login user
app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
  
    const user = await User.findOne({email});
  
    if (!user) {
      return res.status(404).json({ message: "User not found."})
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(404).json({ message: "Password incorrect."})
        } else {
          let access_token = createJWT(
            user.email,
            user._id,
            3600
          );
          jwt.verify(access_token, process.env.TOKEN_SECRET, 
            (err, decoded) => {
              if (err) {
                res.status(500).json({ erros: err });
              }
              if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    message: user
                  });
              }
            });
        }
      })
    }
  } catch(error) {
    res.status(500).json({error : "An error occured."});
  }
})

// ---------------------------------------------------------------------------------

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

const CTransaction = require('./schemas/CurrencyTransaction');

// POST request to update Currency data
app.post('/updateAssets/currency/confirmation', auth, async(req, res) => {
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

const STransaction = require('./schemas/StockTransaction');

// GET request to retrieve stock data
app.get("/transactions", auth, async(req, res) => {
  try {
    const user = await User.findById(req.userId);
    const stockTxns = await STransaction.find({user: user});
    return res.status(200).json(stockTxns);
  } catch (error) {
    console.log(error);
  }
});

// POST request to update Stock data
app.post('/updateAssets/stock/confirmation', auth, async(req, res) => {
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

// --------------------------------------------------------------------------

// ensure port is up and running
app.listen(3000, () => {
  console.log("Server started.");
}) 