const mongoose = require('mongoose');

const sTransactionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    // {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // }
    date: { 
        type: Date, 
        default: Date.now 
    },
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