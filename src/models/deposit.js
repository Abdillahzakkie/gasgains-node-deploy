const mongoose = require("mongoose");

const DepositSchema = new mongoose.Schema({
    depositor: {
        type: String,
        required: true
    },
    depositAmount: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    unlockTimestamp: {
        type: Number,
        required: true
    },
    blockNumber: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model("Deposit", DepositSchema);