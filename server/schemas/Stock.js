const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastTransactionDate: { 
        type: Date, 
        default: Date.now 
    },
    sector: String,
    equity: String,
    ticker: String,
    currency: String,

    lastPrice: Number,
    breakevenPrice: Number,
    shares: Number,
    investedCapital: Number
    },

    {
        collection: "Stock"
    });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;