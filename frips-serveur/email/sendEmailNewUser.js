const { emailUser } = require("./emailNewUser");
var postmark = require("postmark");
const { emailSell } = require("./emailSell");
var client = new postmark.ServerClient("d93b1c93-5749-402d-b378-89913946617f");

const sendEmailNewUser = async (Pseudo,Email) => {
    try {
      
     

    client.sendEmail({
      "From": "noreply@myfrips.ch",
      "To": "noreply@myfrips.ch",
      "Subject": "Confirmation d'inscription à MyFrips",
      "HtmlBody": emailSell("mathieu"),
      "MessageStream": "smtp-test"
    });
  
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {sendEmailNewUser}