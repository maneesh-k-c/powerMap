const express = require('express');
const Feedback = require('../models/feedbackModel');
const { default: mongoose } = require('mongoose');
const feedbackRouter = express.Router();

feedbackRouter.post('/submitfeedback', async (req, res) => {
    try {
        const { feedbackText, userLoginId, stationId } = req.body;

        if (!feedbackText || !userLoginId) {
            return res.status(400).json({
                success: false,
                message: 'Feedback text and userId are required',
            });
        }

        const feedback = new Feedback({
            feedbackText,
            userLoginId,
            stationId
        });

        await feedback.save();

        res.status(200).json({
            success: true,
            message: 'Feedback submitted successfully',
            data: feedback,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit feedback',
        });
    }
});

feedbackRouter.get('/view-single-feedback/:id', async (req, res) => {
    try {
        const { id } = req.params
        const feedbackList = await Feedback.aggregate([
            {
                '$lookup': {
                    'from': 'user_tbs',
                    'localField': 'userLoginId',
                    'foreignField': 'login_id',
                    'as': 'user'
                }
            },{
                '$unwind': '$user'
            },
            {
                '$match': {
                    'stationId': new mongoose.Types.ObjectId(id)
                }
            },
           
        ])
        res.status(200).json({
            success: true,
            data: feedbackList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve feedback',
        });
    }
});
feedbackRouter.get('/viewfeedback', async (req, res) => {
    try {
        const feedbackList = await Feedback.find()
        res.status(200).json({
            success: true,
            data: feedbackList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve feedback',
        });
    }
});

module.exports = feedbackRouter; 
