//import
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Schema/userschema');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Otp = require('../Schema/otpschema');
const cookies = require('cookie-parser');

//use
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = express();
app.use(cookies());
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'Gmail',
  auth: {
    user: process.env.ID,
    pass: process.env.PASSWORD,
  },
});

//verifying user not exist & sending otp
router.post('/signup', async (req, res) => {
  const user = await User.findOne({ email: req.body.formstate.email });
  if (!user) {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    const otpuser = await Otp.findOne({
      email: req.body.formstate.email,
    });
    if (otpuser) {
      await Otp.updateOne({ email: req.body.formstate.email }, { otp: otp });
      const mailOptions = {
        to: req.body.formstate.email,
        subject: 'Otp for registration is: ',
        html:
          '<h3>OTP for account verification is </h3>' +
          "<h1 style='font-weight:bold;'>" +
          otp +
          '</h1>',
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.send(error);
        }
      });
      res.send('success');
    } else {
      await Otp.insertMany({ email: req.body.formstate.email, otp: otp });
      const mailOptions = {
        to: req.body.formstate.email,
        subject: 'Otp for registration is: ',
        html:
          '<h3>OTP for account verification is </h3>' +
          "<h1 style='font-weight:bold;'>" +
          otp +
          '</h1>',
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.send(error);
        }
      });
      res.send('success');
    }
  } else {
    res.send('user already registered');
  }
});

//verifying otp & saving data
router.post('/otp', async (req, res) => {
  const user = await Otp.findOne({ email: req.body.formstate.email });
  if (req.body.otp == user.otp) {
    var token = jwt.sign(
      { email: req.body.formstate.email },
      process.env.JWTKEY
    );
    bcrypt.hash(req.body.formstate.password, 15, async function (err, hash) {
      await User.insertMany({
        username: req.body.formstate.username,
        password: hash,
        email: req.body.formstate.email,
        token: token,
      });
    });
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 36000000),
    };
    res.cookie('token', token, options);
    res.send('success');
  } else {
    res.send('otp not match');
  }
});

//login user
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.formstate.email });
  if (user) {
    const match = await bcrypt.compare(
      req.body.formstate.password,
      user.password
    );

    if (match) {
      const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 36000000),
      };
      res.cookie('token', user.token, options);
      res.send('success');
    } else {
      res.send('wrong pass');
    }
  } else {
    res.send('email not registered');
  }
});

//get user data
router.get('/userdata', async (req, res) => {
  res.send(await User.findOne({ token: req.cookies.token }));
});

module.exports = router;
