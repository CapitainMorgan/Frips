const { PrismaClient } = require("@prisma/client");

const { account, item, chat ,transaction} = new PrismaClient();

const checkIfShouldSend = async (
  id_Receiver,
  { id_Sender, id_Chat, id_Item = undefined }
) => {
  const didUserSendMessage = await chat.findMany({
    where: {
      id: id_Chat,
      message: {
        some: {
          AND: [
            { id_Sender: id_Sender },
            {
              Date_Houre: {
                lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
              },
            },
            { id_Item: { equals: id_Item } },
          ],
        },
      },
    },
  });

  console.log(didUserSendMessage);

  if (id_Sender && id_Item) {
    const findUserItem = await account.findUnique({
      where: {
        id: id_Receiver,
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
        id: true,
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
        id: id_Receiver,
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
        id: true,
      },
    });
    return { findUserItem };
  }
};

const findUserNameEmail = async (id_Receiver) => {
  const findUserNameEmail = await account.findUnique({
    where: {
      id: id_Receiver,
    },
    select: {
      Firstname: true,
      Email: true,
    },
  });
  return findUserNameEmail;
};

const bill = async (id_Receiver, { id_Item }) => {
  let mySellItem = await transaction.findFirst({
    where: {
      id_Item: parseInt(id_Item),
      item: {
        id_Seller: id_Receiver,
      },
    },
    select: {
      item: {
        select: {
          image: {
            take: 1,
          },
          id: true,
          Name: true,
          Price: true,
          item_fees: {
            select: {
              fees: {
                select: {
                  Name: true,
                  Description: true,
                  Price: true,
                },
              },
            },
          },
          Size:true,
          item_brand:{
            select:{
                brand:{
                    select:{
                        Name:true
                    }
                }
            }
          },

          DeliveryDetails: true,
        },
      },
      id:true,

      DateSell: true,
      DateSend: true,
      account: {
        select: {
          Pseudo: true,
          id: true,
          address: true,
          Firstname: true,
          Lastname: true,
          Email: true,
        },
      },

      Price: true,
      Status: true,
    },
  });


  const transactionInfo = {
    Price: mySellItem.Price,
    Price_Fees:mySellItem.Price - mySellItem.item.Price,
    PriceDelivery:7,
    DateSell: new Date(mySellItem.DateSell),
    id_transaction: mySellItem.id,

  };

  
  return {buyerAccount: mySellItem.account,soldItem:mySellItem.item,transactionInfo};
};

const typeOfEmail = async (type, id_Receiver, args) => {
  switch (type) {
    case "Welcome":
      return await findUserNameEmail(id_Receiver);
    case "NewMessage":
      const infoReceiver = await checkIfShouldSend(id_Receiver, args);
      const SenderPseudo = await account.findUnique({
        where: { id: id_Receiver },
        select: {
          Pseudo: true,
          image: {
            select: {
              image: true,
            },
          },
        },
      });
      console.log(infoReceiver);
      return { SenderPseudo, ...infoReceiver };

      break;

    case "Sell":
      return await findUserNameEmail(id_Receiver);

    case "Bill":
      return await bill(id_Receiver, args);
    default:
      break;
  }
};

const searchInformation = async (id_Receiver, type, args) => {
  try {
    console.log(args);
    const information = await typeOfEmail(type, id_Receiver, args);

    if (!Boolean(information)) return;

    return information;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchInformation };
