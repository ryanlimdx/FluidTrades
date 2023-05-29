/**
 * This file will be used to send requests for account creation and login purposes.
 */
// Setting up of backend server + connect to DB
const app = require("./app");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createJWT } =require('./middleware/webtoken');

const User = require('./schemas/User');
// POST request to register user into database
app.post('/register', async(req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    console.log(email);
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
      const newUser = await User.create({
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

// ensure port is up and running
app.listen(3000, () => {
  console.log("Server started.");
}) 