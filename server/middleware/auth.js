require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  // Authorization field in the HTTP request header
  const authorization = req.headers['authorization'];
  // console.log(req.headers)

  // No header
  if (!authorization) {
    console.log('Tried to access route without authorization')
    return res.status(401).json({ message: "No token, unauthorized access."});
  }

  // Get token from header
  const token = authorization.split(' ')[1];

  // Verify incoming token and set requesting user id to be decoded user
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
  
      if (err) {
        return res.status(401).json({ message: "Invalid token, unauthorized access."})
      }

      req.user = payload.user;
      next();
    })
  } catch (err) {
    console.log("Authentication failed: " + err.message);
    return res.status(500).json({ message: "Server Error"});
  }
}

