const express = require('express');
const bookingModel = require('../models/bookingModel');
const walletModel = require('../models/walletModel');
const { default: mongoose } = require('mongoose');

const booking = express.Router();

booking.post('/todays-booking', async (req, res) => {
  try {
    const { stationId, date } = req.body;

    const existingBooking = await bookingModel.find({
        stationId:new mongoose.Types.ObjectId(stationId),
        date,
    });

    if (existingBooking) {
        return res.status(200).json({ data: existingBooking });
    }
    return res.status(400).json({ message: 'No bookings' });
  } catch (error) {
    return res.status(500).json({ message: 'No data' });
  }
});

booking.post('/check-availability', async (req, res) => {
   try {
    const { stationId, date, startTime, endTime } = req.body;
    const existingBooking = await bookingModel.findOne({
        stationId,
        date,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Partial overlap
        ],
        status: { $ne: "cancelled" }
    });
    if (existingBooking) {
        return res.status(200).json({
            success: false,
            message: 'Slot already filled for the given time.'
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Slot is available.'
    });
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: 'Internal server error.'
    });
   }
});


booking.post('/book-slot', async (req, res) => {
    const { stationId, date, startTime, endTime, userLoginId, amount } = req.body;

    // Check for overlapping bookings
    const existingBooking = await bookingModel.findOne({
        stationId,
        date,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Partial overlap
        ],
        status: { $ne: "cancelled" }
    });

    if (existingBooking) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Slot already filled for the given time.'
        });
    }

    // Create a new booking
    const newBooking = new bookingModel({ stationId, date, startTime, endTime, userLoginId, amount });
    await newBooking.save();

    return res.status(200).json({
        success: true,
        error: false,
        data: newBooking,
        message: 'Booking confirmed.'
    });
});

booking.get('/view-booking/:id', async (req, res) => {
    const { id } = req.params;

    const existingBooking = await bookingModel.find({
        userLoginId: id
    }).populate('stationId')

    if (existingBooking) {
        return res.status(200).json({
            success: true,
            error: false,
            data: existingBooking
        });
    }


    return res.status(400).json({
        success: false,
        error: true,
        message: 'No data found',
    });
});

booking.get('/station-view-booking/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);


    const existingBooking = await bookingModel.aggregate([
        {
            '$lookup': {
                'from': 'user_tbs',
                'localField': 'userLoginId',
                'foreignField': 'login_id',
                'as': 'user'
            }
        },
        {
            '$unwind': '$user'
        },
        {
            '$match': {
                'stationId': new mongoose.Types.ObjectId(id)
            }
        },

    ])

   

    if (existingBooking) {
        return res.status(200).json({
            success: true,
            error: false,
            data: existingBooking
        });
    }


    return res.status(400).json({
        success: false,
        error: true,
        message: 'No data found',
    });
});

booking.put("/cancel-booking/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const bookingToCancel = await bookingModel.findById(id).populate("userLoginId");
        if (!bookingToCancel) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Booking not found.",
            });
        }
        console.log(bookingToCancel);


        if (bookingToCancel.status === "cancelled") {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Booking is already cancelled.",
            });
        }

        const currentTime = new Date();
        const bookingDateTime = new Date(`${bookingToCancel.date}T${bookingToCancel.startTime}:00`);
        const timeDifferenceInMinutes = (bookingDateTime - currentTime) / (1000 * 60);

        let deduction = 0;

        if (timeDifferenceInMinutes < 30) {
            deduction = 100;

            const wallet = await walletModel.findOne({ userLoginId: bookingToCancel.userLoginId });
            if (!wallet) {
                return res.status(404).json({
                    success: false,
                    error: true,
                    message: "Wallet not found for the user.",
                });
            }

            if (wallet.amount < deduction) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "Insufficient wallet balance for the deduction.",
                });
            }

            wallet.amount -= deduction;
            wallet.transactions.push({
                type: "debit",
                amount: deduction,
                date: new Date(),
            });
            await wallet.save();
        }
        bookingToCancel.status = "cancelled";
        await bookingToCancel.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Booking cancelled successfully.",
            deduction,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred while cancelling the booking.",
        });
    }
});

booking.put('/ongoing-booking/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await bookingModel.findById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Booking not found',
            });
        }

        booking.status = 'ongoing';
        await booking.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Charging started',
            data: booking,
        });
    } catch (error) {
        console.error('Error updating booking status:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'An error occurred while updating the booking status',
        });
    }
});
            
booking.put('/complete-booking/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await bookingModel.findById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Booking not found',
            });
        }

        booking.status = 'completed';
        await booking.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: 'Booking status updated to complete',
            data: booking,
        });
    } catch (error) {
        console.error('Error updating booking status:', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'An error occurred while updating the booking status',
        });
    }
});

module.exports = booking;