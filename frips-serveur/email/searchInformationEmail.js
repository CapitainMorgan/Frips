const { PrismaClient } = require("@prisma/client");

const { account, item, chat, transaction,pricepropose } = new PrismaClient();

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
              AND: [
                {
                  Date_Houre: {
                    gte: new Date(new Date().getTime() - 24 * 60 * 60 * 2000),
                  },
                  Text: { not: { equals: null } },
                },
              ],
            },
          ],
        },
      },
    },
  });

  if (didUserSendMessage.length !== 0) {
    return;
  }

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

const bill = async (id_Receiver, { id_Item, id_Buyer }) => {
  console.log(id_Buyer, id_Item);
  let mySellItem = await transaction.findFirst({
    where: {
      id_Item: parseInt(id_Item),
      id_Account: id_Buyer,
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
          Size: true,
          item_brand: {
            select: {
              brand: {
                select: {
                  Name: true,
                },
              },
            },
          },

          DeliveryDetails: true,
        },
      },
      id: true,

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
      TaxPrice: true,
      DeliveryPrice: true,

      Price: true,
      Status: true,
    },
  });

  const transactionInfo = {
    Price: mySellItem.Price,
    Price_Fees: mySellItem.TaxPrice,
    PriceDelivery: mySellItem.DeliveryPrice,
    DateSell: new Date(mySellItem.DateSell),
    id_transaction: mySellItem.id,
  };

  return {
    buyerAccount: mySellItem.account,
    soldItem: mySellItem.item,
    transactionInfo,
  };
};

const offer = async (id_Receiver, { id_Sender, id_Item }) => {
  const ifAlreadyHaveSomeProposition = await pricepropose.count({
    where:{
      id_Item,
      SendDate: {
        gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    }
  }) 

  console.log(ifAlreadyHaveSomeProposition,id_Item)

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
      id:true
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



  return { findUserItem,itemForEmail };
};

const typeOfEmail = async (type, id_Receiver, args) => {
  let infoReceiver
  switch (type) {
    case "Welcome":
      return await findUserNameEmail(id_Receiver);
    case "NewMessage":
       infoReceiver = await checkIfShouldSend(id_Receiver, args);
      const SenderPseudo = await account.findUnique({
        where: { id: args?.id_Sender },
        select: {
          Pseudo: true,
          image: {
            select: {
              image: true,
            },
          },
          id:true
        },
        
      });

    
      return { SenderPseudo, ...infoReceiver };

    case "Sell":
      return await findUserNameEmail(id_Receiver);

    case "Bill":
      return await bill(id_Receiver, args);
    case "ReceivedOffer":
      infoReceiver = await offer(id_Receiver, args);
      const senderInfo = await account.findUnique({
        where: { id: args.id_Sender },
        select: {
          Pseudo: true,
          image: {
            select: {
              image: true,
            },
          },
          id:true
        },
        
      });
      if(!Boolean(infoReceiver)){
        return;
      }

      return {...infoReceiver,senderInfo};
    
    case "AcceptedOffer":
      return await findUserNameEmail(id_Receiver);
   
    default:
      break;
  }
};

const searchInformation = async (id_Receiver, type, args) => {
  try {
    const information = await typeOfEmail(type, id_Receiver, args);

    if (!Boolean(information)) return;

    return information;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchInformation };
