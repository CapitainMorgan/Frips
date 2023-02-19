const { emai } = require("./emailNewUser");
const nodemailer = require("nodemailer");
const { emailSell } = require("./emailSell");

const sendEmailSell = async (Pseudo,Email) => {
    try {
      
  
  
      const transporter = nodemailer.createTransport({
        host: "mail.infomaniak.com",
        port: 465,
  
        auth: {
          user: "noreply@myfrips.ch",
          pass: "Hello1234",
        },
      });
  
  
      const options = {
        from: "noreply@myfrips.ch",
        to: Email,
        subject: "Une vente a été conclue !",
        html: emailSell(Pseudo)
      };
  
      transporter.sendMail(options)
  
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {sendEmailSell}