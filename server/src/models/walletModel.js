
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const walletSchema = new schema({
    userLoginId: { type: mongoose.Types.ObjectId, ref: 'login_tb' },
    amount: { type: Number, required: true }, // Represents the current wallet balance
    transactions: [
        {
            type: { type: String, enum: ['credit', 'debit'], required: true }, // Transaction type
            amount: { type: Number, required: true }, // Amount for this transaction
            date: { type: Date, default: Date.now }, // Transaction date
        },
    ],
});

const walletModel = mongoose.model('wallet_tb', walletSchema);
module.exports = walletModel;