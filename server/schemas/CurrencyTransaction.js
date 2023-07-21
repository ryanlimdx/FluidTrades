const mongoose = require('mongoose');

const cTransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now
    },
    transactionType: {
        type: String,
        required: true
    },
    sellCurrency: {
        type: String,
        required: true
    },
    sellAmount: {
        type: Number,
        required: true
    },
    buyCurrency: String,
    buyAmount: Number,
    commissions: Number,
    exchangeRate: Number
    },

    {
        collection: "CTransaction"
    });

const CTransaction = mongoose.model('CTransaction', cTransactionSchema);

module.exports = CTransaction;