const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastTransactionDate: { 
        type: Date, 
        default: Date.now
    },
    currency: String,
    balance: Number,
    exchangeRate: Number
    },

    {
        collection: "Currency"
    });

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;