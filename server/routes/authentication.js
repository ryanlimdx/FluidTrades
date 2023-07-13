const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createJWT } = require('../middleware/webtoken');

const User = require('../schemas/User');

// POST request to register user into database
router.post('/register', async(req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password && name)) {
      return res.status(400).json({ message: "Your name, email and password are required!"})
    }
    
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({ message: "A user with that email already exists."})
    } else {
      var salt = bcrypt.genSaltSync(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      // Create new User
      await User.create({
        name: name,
        email: email,
        password: encryptedPassword
      })

      return res.status(200).send({status : "ok"})
    } 
  } catch(error) {
    res.status(500).json({error : "An error occured."});
  }
})

// POST request to login user
router.post('/login', async (req, res) => {
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

module.exports = router;