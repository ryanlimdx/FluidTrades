const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lastTransactionDate: { 
        type: Date, 
        default: Date.now 
    },
    lastModified: {
        type: Date,
    },
    sector: String,
    security: String,
    ticker: String,
    currency: String,

    quantity: Number,
    investedCapital: Number,

    currPrice: mongoose.Schema.Types.Mixed,
    marketValue: mongoose.Schema.Types.Mixed,
    returns: mongoose.Schema.Types.Mixed,
    returnsPCT: mongoose.Schema.Types.Mixed,
    breakevenPrice: mongoose.Schema.Types.Mixed

    },

    {
        collection: "Crypto"
    });

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;