const mongoose = require('mongoose');

const cTransactionSchema = new mongoose.Schema({
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

const CTransaction = mongoose.model('Transaction', cTransactionSchema);

module.exports = CTransaction;