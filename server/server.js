require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');  

// connect to database
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database.");
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);;
    process.exit(1);
});


const User = require('./schemas/User');
// POST request to register user into database
app.post('/register', async(req, res) => {
  try {np
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
      // Create new User
      const newUser = User.create({
        name: name,
        email: email,
        password: password
      })
      res.send({status : "ok"})
    }
  } catch(error) {
    res.status(500).json({error : "An error occured."});
  }
})

// ensure port is up and running
app.listen(4000, () => {
  console.log("Server started.");
}) 