const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: "Naver",
    auth: {
        user: "gang471342@naver.com",
        pass: "arsenal115!"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  module.exports={
      smtpTransport
  }