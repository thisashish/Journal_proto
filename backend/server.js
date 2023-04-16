//import
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./Routes/auth');
//use
const app = express();
require('dotenv').config();
app.use(express.json());
//db & server connections
mongoose.connect(process.env.MONGOURI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('db & server running @' + process.env.PORT);
  });
});
app.use('/auth', auth);
