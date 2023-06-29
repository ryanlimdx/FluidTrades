const mongoose = require('mongoose');

const sTransactionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    transactionType: {
        type: String,
        required: true
    },
    sector: String,
    equity: String,
    ticker: String,
    currency: String,

    price: Number,
    shares: Number,
    fees: Number
    },

    {
        collection: "transactions"
    });

const STransaction = mongoose.model('STransaction', sTransactionSchema);

module.exports = STransaction;