require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  // Authorization field in header
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(401).json({ message: "No token, unauthorized access."});
  }

  // Retrieve Token
  const token = authorization.split(' ')[1];

  // Verify incoming token and set requesting user id to be decoded user
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, payload) {
  
      if (err) {
        return res.status(401).json({ message: "Invalid token, unauthorized access."})
      }

      req.userId = payload.userId;
      
      next();
    })
  } catch (err) {
    console.log("Authentication failed: " + err.message);
    return res.status(500).json({ message: "Server Error"});
  }
}

