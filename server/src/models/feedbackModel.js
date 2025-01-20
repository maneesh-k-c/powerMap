const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedbackText: {
        type: String,
        required: true,
    },
    userLoginId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'login_tb', 
        required: true,
    },
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'station_tb',  
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,   
    },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback; 