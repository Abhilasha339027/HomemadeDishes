const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_PASS, FROM_MAIL_LINE } = require("../config");

module.exports.sendMail = async (chef, email) => {
  let mailTransporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS,
    },
  });

  let mailInfo = await mailTransporter.sendMail({
    from: FROM_MAIL_LINE,
    to: chef,
    subject: "New Order",
    html: email,
  });
};
