const mongoose = require('mongoose');

const cryptoTransactionSchema = new mongoose.Schema({
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
    sector: String,
    security: String,
    ticker: String,
    currency: String,

    price: Number,
    quantity: Number,
    commissions: Number
    },

    {
        collection: "CryptoTransaction"
    });

const STransaction = mongoose.model('CryptoTransaction', cryptoTransactionSchema);

module.exports = STransaction;