const mongoose = require('mongoose');

const ctransactionSchema = new mongoose.Schema({
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

const Transaction = mongoose.model('Transaction', ctransactionSchema);

module.exports = Transaction;