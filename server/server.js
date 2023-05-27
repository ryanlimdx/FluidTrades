const express = require("express");
const app = express();

// const mongoose = require('mongoose');

// const mongoUri = ""

// ensure port is up and running
app.listen(3000, () => {
    console.log("Server started on Port 3000.");
})

// connect to database
// mongoose.connect(mongoUri, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Connected to database.")
//     mongoose.disconnect();
// }).catch((e) => {
//     console.log(e)
// });

