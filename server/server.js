require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

// ensure port is up and running
app.listen(4000, () => {
    console.log("Server started on Port 4000.");
})

// connect to database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to database.");
    mongoose.disconnect();
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);;
    process.exit(1);
});

mongoose.disconnect()
  .then(() => {
    console.log('Mongoose connection closed');
    process.exit();
  })
  .catch((error) => {
    console.error('Error while closing Mongoose connection:', error);
    process.exit(1);
  });