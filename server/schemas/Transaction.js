const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    transactionType: {
        type: String,
        required: true
    },
    sellCurrency: String,
    sellAmount: Number,
    buyCurrency: String,
    buyAmount: Number,
    fees: Number
    },

    {
        collection: "transactions"
    });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;