//import
const express = require('express');
const mongoose = require('mongoose');
//use
const app = express();
require('dotenv').config();
//db & server connections
mongoose.connect(process.env.MONGOURI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('db & server running @' + process.env.PORT);
  });
});
