const express = require("express");
const mongoose = require("mongoose");
const walletModel = require("../models/walletModel");

const walletRouter = express.Router();


walletRouter.post("/wallet/credit", async (req, res) => {
    const { userLoginId, amount } = req.body;

    if (!userLoginId || !amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid input. Provide valid userLoginId and amount." });
    }

    try {
        // Find the user's wallet
        let wallet = await walletModel.findOne({ userLoginId });

        if (!wallet) {
            // Create a new wallet if it doesn't exist
            wallet = new walletModel({
                userLoginId,
                amount,
                transactions: [{ type: "credit", amount, date: new Date() }],
            });
        } else {
            // Update the wallet balance and transaction history
            wallet.amount = Number(amount)+Number(wallet.amount);
            wallet.transactions.push({ type: "credit", amount, date: new Date() });
        }

        await wallet.save();
        res.status(200).json({ message: "Balance credited successfully.", wallet });
    } catch (error) {
        console.error("Error crediting balance:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Deduct (Debit) from Wallet
walletRouter.post("/wallet/debit", async (req, res) => {
    const { userLoginId, amount } = req.body;

    if (!userLoginId || !amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid input. Provide valid userLoginId and amount." });
    }

    try {
        // Find the user's wallet
        const wallet = await walletModel.findOne({ userLoginId });

        if (!wallet) {
            return res.status(404).json({ error: "Wallet not found for the given userLoginId." });
        }

        if (wallet.amount < amount) {
            return res.status(400).json({ error: "Insufficient balance." });
        }

        // Update the wallet balance and transaction history
        wallet.amount -= amount;
        wallet.transactions.push({ type: "debit", amount, date: new Date() });

        await wallet.save();
        res.status(200).json({ message: "Balance debited successfully.", wallet });
    } catch (error) {
        console.error("Error debiting balance:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// View Wallet Details
walletRouter.get("/wallet/:userLoginId", async (req, res) => {
    const { userLoginId } = req.params;

    try {
        // Find the wallet for the given userLoginId
        const wallet = await walletModel.findOne({ userLoginId });

        if (!wallet) {
            return res.status(200).json({ error: "Wallet not found for the given userLoginId." });
        }

        res.status(200).json({
            message: "Wallet details retrieved successfully.",
            wallet,
        });
    } catch (error) {
        console.error("Error retrieving wallet details:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});


module.exports = walletRouter;
