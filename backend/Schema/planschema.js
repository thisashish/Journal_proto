const mongoose = require('mongoose');

const planschema = new mongoose.Schema({
  entry: [{ type: String, required: true }],
  sl: [{ type: String, required: true }],
  target: [{ type: String, required: true }],
});

module.exports = mongoose.model('Plan', planschema);
