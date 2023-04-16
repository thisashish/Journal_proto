const mongoose = require('mongoose');

const otpschema = new mongoose.Schema({
  otp: { type: Number, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Otp', otpschema);
