const express = require('express');
const stationModel = require('../models/stationModel');
const { default: mongoose } = require('mongoose');
const Feedback = require('../models/feedbackModel');
const stationRouter = express.Router();


stationRouter.get('/all-stations', async (req, res) => {
    try {
        const stationList = await stationModel.find()
        if (stationList[0]) {
            return res.status(200).json({
                success: true,
                data: stationList,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No data found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }



})

stationRouter.get('/my-stations/:login_id', async (req, res) => {
    try {
        const { login_id } = req.params;
        const userList = await stationModel.find({ Owner_id: login_id })
        if (userList[0]) {
            return res.status(200).json({
                success: true,
                data: userList,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No data found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }



})

stationRouter.get('/getchargingstation/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const station = await stationModel.aggregate([
            {
                '$lookup': {
                    'from': 'owner_tbs',
                    'localField': 'Owner_id',
                    'foreignField': 'login_id',
                    'as': 'owner'
                }
            },
            {
                '$unwind': '$owner'
            },
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(id)
                }
            },
        ])
        if (station) {
            return res.status(200).json({
                success: true,
                data: station[0],
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No data found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }



})
stationRouter.get('/feedbacks', async (req, res) => {
    try {
        
        const feedback = await Feedback.aggregate([
            
                {
                    '$lookup': {
                        'from': 'user_tbs',
                        'localField': 'userLoginId',
                        'foreignField': 'login_id',
                        'as': 'user'
                    }
                }, {
                    '$lookup': {
                        'from': 'station_tbs',
                        'localField': 'stationId',
                        'foreignField': '_id',
                        'as': 'station'
                    }
                },

                {
                    '$unwind': '$user'
                },
                {
                    '$unwind': '$station'
                },
                
            ])
        if (feedback) {
            return res.status(200).json({
                success: true,
                data: feedback,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No data found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }



})









module.exports = stationRouter