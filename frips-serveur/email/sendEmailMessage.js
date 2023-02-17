const nodemailer = require("nodemailer");
const email = require("./emailMessage");

const { PrismaClient } = require("@prisma/client");

const { account, item, chat } = new PrismaClient();

const checkIfShouldSend = async (id, id_Item, chat_id) => {
  const didUserSendMessage = await chat.findMany({
    where: {
      id: chat_id,
      message: {
        some: {
          id_Sender: id,
          Date_Houre: {
            lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          },
        },
      },
    },
  });

  console.log(didUserSendMessage)
  if (didUserSendMessage.length === 0) return;

  else if (id && id_Item) {
    const findUserItem = await account.findUnique({
      where: {
        id,
      },
      select: {
        Pseudo: true,
        image: {
          select: {
            image: true,
          },
        },
        Firstname: true,
        Email: true,
        id:true,
      },
    });

    const itemForEmail = await item.findUnique({
      where: {
        id: id_Item,
      },
      select: {
        image: {
          select: {
            image: true,
          },
          take: 1,
        },
        Name: true,
        Size: true,
        id: true,

      },
    });

    return { findUserItem, itemForEmail };
  } else {
    const findUserItem = await account.findUnique({
      where: {
        id,
      },
      select: {
        Pseudo: true,
        image: {
          select: {
            image: true,
          },
        },
        Firstname: true,
        Email: true,
        id:true,

      },
    });
    return { findUserItem };
  }
};

const sendEmailMessage = async (id,id_Receiver, chat_id,res, id_Item, pricepropose) => {
  try {
    const {Email} = await account.findUnique({
      where:{
        id:id_Receiver
      },
      select:{
        Email:true
      }
    })

    const canSendEmail = await checkIfShouldSend(id, id_Item, chat_id);
    if (!canSendEmail) return;


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
      subject: typeEmailSubject(id_Item),
      html: email(
        "",
        canSendEmail.findUserItem,
        canSendEmail.itemForEmail,
        pricepropose,
        chat_id
      ),
    };

    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400)
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
      }
    });

  } catch (error) {
    console.log(error);
  }
};

const typeEmailSubject = (type) => {
  if (type) {
    return "Tu as une proposition d'offre !";
  } else {
    return "Tu as reçu un nouveau message";
  }
};

module.exports = { sendEmailMessage };
