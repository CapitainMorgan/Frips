const nodemailer = require("nodemailer");

const { PrismaClient } = require("@prisma/client");
const { emailConfirmationSend } = require("./emailConfirmationSend");

const { account, item, chat } = new PrismaClient();

const sendEmailConfirmation = async (item,Email) => {
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
      subject: "Confirmation d'envoi de votre article - MyFrips",
      html:emailConfirmationSend()
    };

    transporter.sendMail(options)

  } catch (error) {
    console.log(error);
  }
};



module.exports = { sendEmailConfirmation };
