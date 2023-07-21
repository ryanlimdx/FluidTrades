const mongoose = require('mongoose');

const sTransactionSchema = new mongoose.Schema({
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
        collection: "STransaction"
    });

const STransaction = mongoose.model('STransaction', sTransactionSchema);

module.exports = STransaction;