const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  stationId: {type:mongoose.Types.ObjectId, ref:'station_tb'},
  date: { type: String, required: true },
  amount: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  userLoginId: {type:mongoose.Types.ObjectId, ref:'login_tb', required: true},
  status:{type: String, default: 'booked',}
});

const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel     