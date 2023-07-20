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
    security: String,
    ticker: String,
    currency: String,

    quantity: Number,
    investedCapital: Number,

    currPrice: Number,
    returns: Number,
    returnsPCT: Number,
    breakevenPrice: Number

    },

    {
        collection: "Stock"
    });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;