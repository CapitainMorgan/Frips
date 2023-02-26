var postmark = require("postmark");
const config = require("config");
const { emailUser } = require("./Template/emailNewUser");
const { emailMessage } = require("./Template/emailMessage");
const { searchInformation } = require("./searchInformationEmail");
const { emailSell } = require("./Template/emailSell");
const { emailBill } = require("./Template/emailBill");
const client = new postmark.ServerClient(config.get("postMark"));

const typeOfEmail = (type, information, args) => {
  switch (type) {
    case "Welcome":
      return {
        From: "noreply@myfrips.ch",
        To: "noreply@myfrips.ch",
        Subject: "Confirmation d'inscription à MyFrips",
        HtmlBody: emailUser(information.Firstname),
        MessageStream: "smtp-test",
      };
    case "NewMessage":
      return {
        From: "noreply@myfrips.ch",
        To: "noreply@myfrips.ch",
        Subject: Boolean(args?.id_Item)
          ? "Vous avez reçu une nouvelle offre"
          : "Vous avez reçu un nouveau message",
        HtmlBody: emailMessage(
          information.findUserItem,
          information.SenderPseudo,
          args?.id_Chat,
          information?.itemForEmail,
          args?.pricepropose
        ),
        MessageStream: "smtp-test",
      };
    case "Sell":
      return {
        From: "noreply@myfrips.ch",
        To: "noreply@myfrips.ch",
        Subject: "Une vente a été conclue !",
        HtmlBody: emailSell(information.findUserItem, args.id_Item),
        MessageStream: "smtp-test",
      };
    case "Bill":
      return {
        From: "noreply@myfrips.ch",
        To: "noreply@myfrips.ch",
        Subject: "Résumé de votre achat",
        HtmlBody: emailBill(
          information.buyerAccount,
          information.soldItem,
          information.transactionInfo
        ),
        MessageStream: "smtp-test",
      };
    default:
      break;
  }
};

const sendEmail = async (id_Receiver, type, next, args) => {
  try {
    const information = await searchInformation(id_Receiver, type, args);
    
    client.sendEmail(typeOfEmail(type, information, args),(error,result)=>{
        console.log(error)
        if(!error){
        next()
        }
        else{
            throw new Error(error)
        }
    })

    next()
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };
