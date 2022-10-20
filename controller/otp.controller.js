const Otp = require('../models/otp');
const User = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');
const nodeMailer = require('nodemailer');
const { findOne } = require('../models/otp');

const sendEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // if (!user) {
    //   return res.status(StatusCodes.UNAUTHORIZED).json({
    //     msg: 'Invalid Credentials',
    //   });
    // }
    // lets gererate opt
    let otpcode = Math.floor(Math.random() * 1000000 + 1);
    console.log('otpcode', otpcode);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    const otpResponse = await otpData.save();
    if (otpResponse) {
      mailTransform(req.body.email, otpcode);
      res.status(StatusCodes.CREATED).json({
        msg: 'Otp has been send to your email',
        data: otpResponse,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

const mailTransform = (email, otp) => {
  console.log('Calling');

  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mtesting623@gmail.com',
      pass: `${process.env.PASSWORD}`,
    },
  });
  let details = {
    from: 'mtesting623@gmail.com',
    to: email,
    subject: 'Testing our modemailer',
    text: `We're excited to have you get started! First you need to confirm your account. Just verify the opt.
    Here Is Your One Time Password ${otp}`,
  };
  console.log('detailse', details);
  transporter.sendMail(details, (err) => {
    if (err) {
      console.log('it has error', err);
    } else {
      console.log('email has been send');
    }
  });
};

const verifyOtp = async (req, res) => {
  try {
    const doc = await Otp.findOne({ code: req.body.code });

    if (doc) {
      let currentTime = new Date().getTime();
      let diff = doc.expireIn - currentTime;
      if (diff < 0) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token Expire' });
      } else {
        return res.status(StatusCodes.OK).json({ message: 'Otp verfied!' });
      }
    }
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid or expire OTP' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error.message,
    });
  }
};

module.exports = {
  sendEmail,
  verifyOtp,
};
