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
    sellCurrency: String,
    sellAmount: Number,
    buyCurrency: String,
    buyAmount: Number,
    fees: Number
    },

    {
        collection: "CTransaction"
    });

const CTransaction = mongoose.model('CTransaction', cTransactionSchema);

module.exports = CTransaction;