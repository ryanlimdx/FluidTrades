require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
// allow request to be sent from react app to express server using cors
app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
  }),
);
// read JSON bodies
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

module.exports = app; 