const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { PrismaClient } = require("@prisma/client");

const { account, item, chat, message, pricepropose } = new PrismaClient();

router.post("/", auth, async (req, res) => {
  let id_item = parseInt(req.body.id);
  const { id } = req.user;

  try {
    const id_Receiver = await item.findUnique({
      where: {
        id: parseInt(id_item),
      },
      select: {
        account: {
          select: {
            Pseudo: true,
            id: true,
          },
        },
      },
    });

    let existConv = await chat.findMany({
      where: {
        OR: [
          {
            id_Account_1: id,
            id_Account_2: id_Receiver.account.id,
          },
          {
            id_Account_2: id,
            id_Account_1: id_Receiver.account.id,
          },
        ],
      },

      select: {
        id: true,
        message: true,
        account_accountTochat_id_Account_2: {
          select: {
            Pseudo: true,
            id: true,
          },
        },
        account_accountTochat_id_Account_1: {
          select: {
            Pseudo: true,
            id: true,
          },
        },
      },
    });

    if (existConv.length !== 0) {
      const test = {
        Profile: [
          existConv[0].account_accountTochat_id_Account_1.id,
          existConv[0].account_accountTochat_id_Account_1.Pseudo,
        ],
        Profile1: [
          existConv[0].account_accountTochat_id_Account_2.id,
          existConv[0].account_accountTochat_id_Account_2.Pseudo,
        ],
        message: existConv[0].message,
        id: existConv[0].id,
      };
      res.status(200).json(test);
    }

    let create;
    if (existConv.length === 0 || existConv === undefined) {
      create = await chat.create({
        data: {
          id_Account_1: id,
          id_Account_2: id_Receiver.account.id,
        },
        select: {
          message: true,
          id: true,
          account_accountTochat_id_Account_2: {
            select: {
              Pseudo: true,
              id: true,
            },
          },
          account_accountTochat_id_Account_1: {
            select: {
              Pseudo: true,
              id: true,
            },
          },
        },
      });

      const test = {
        Profile: [
          create.account_accountTochat_id_Account_1.id,
          create.account_accountTochat_id_Account_1.Pseudo,
        ],
        Profile1: [
          create.account_accountTochat_id_Account_2.id,
          create.account_accountTochat_id_Account_2.Pseudo,
        ],
        message: create.message,
        id: create.id,
      };

      res.status(200).json(test);
    }
  } catch (error) {
    res.status(500).send("Serveur error");
  }
});

router.post("/myConversation/newMessage", auth, async (req, res) => {
  const id_Chat = req.body.chat_id;
  const text = req.body.Text;
  const { id } = req.user;
  const { id_Item } = req.body;
  const PricePropose = req.body.Price;

  try {
    if (id_Item && PricePropose) {
      await pricepropose.upsert({
        where:{
          id_Account_id_Item:{
            id_Account:id,
            id_Item:id_Item
          }
        },
        create:{
            id_Item: id_Item,
            id_Account: id,
            Price: parseInt(PricePropose),
            dateApprove: null,
            Approve: false,
  
          
        },
        update:{
            id_Item: id_Item,
            id_Account: id,
            Price: parseInt(PricePropose),
            dateApprove: null,
            Approve: false,
  
          
        }

        
      });
    }

    await message.create({
      data: {
        Unread: true,
        Text: text,
        Date_Houre: new Date(),
        id_Sender: id,
        id_Receiver: req.body.id_Receiver,
        id_Item: id_Item,
        id_Chat: parseInt(id_Chat),
      },
    });

    res.status(200).json("message send");
  } catch (error) {
    console.log(error);
    res.status(500).send("Serveur error");
  }
});

router.put("/updateMessage", auth, async (req, res) => {
  const { id_Chat } = req.body;
  const { id } = req.user;

  try {
   const Messages = await message.updateMany({
      where: {
        id_Chat: parseInt(id_Chat),
        id_Receiver: id,
      },
      data: {
        Unread: false,
      },
    });


    res.status(200).json("Messages updates");
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur Error");
  }
});

router.get("/unReadNotification", auth, async (req, res) => {
  const { id } = req.user;
  try {
    const conversation = await chat.findMany({
      where: {
        message: {
          some: {
            Unread: true,
            account_accountTomessage_id_Receiver: {
              id,
            },
          },
        }
        ,
         
      },  
      select:{
        id:true
      }
      
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur Erreur");
  }
});

router.get("/MyConversation/lastMessage/:id", auth, async (req, res) => {
  const { id } = parseInt(req.params);

  try {
    const conv = await chat.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        message: {
          take: -1,
        },
      },
    });

    const test = {
      message: conv.message[0],
    };

    res.status(200).json(test);
  } catch (error) {
    console.log(error);
    res.status(500).send("Serveur error");
  }
});

router.get("/MyConversation/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const messageNumber = await message.count({
      where: {
        id_Chat: parseInt(id),
      },
    });

    const conv = await chat.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        message: {
          orderBy: { Date_Houre: "desc" },

          take: 20,
          include: {
            item: {
              select: {
                image: {
                  take: 1,
                },
                Price: true,
                id: true,
                pricepropose: {
                  select: {
                    Price: true,
                    id_Account: true,
                  },
                },
              },
            },
          },
        },
        account_accountTochat_id_Account_2: {
          select: {
            Pseudo: true,
            id: true,
            image: {
              select: {
                image: true,
              },
            },
          },
        },
        account_accountTochat_id_Account_1: {
          select: {
            Pseudo: true,
            id: true,
            image: {
              select: {
                image: true,
              },
            },
          },
        },
      },
    });


    const data = {
      Profile: {
        id: conv.account_accountTochat_id_Account_1.id,
        Pseudo: conv.account_accountTochat_id_Account_1.Pseudo,
        image: conv.account_accountTochat_id_Account_1.image?.image,
      },
      Profile1: {
        id: conv.account_accountTochat_id_Account_2.id,
        Pseudo: conv.account_accountTochat_id_Account_2.Pseudo,
        image: conv.account_accountTochat_id_Account_2.image?.image,
      },

      message: conv.message,

      messageNumber,
    };


    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Serveur error");
  }
});
router.post("/MyConversation/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { number } = req.body;

  console.log(id)

  try {
    const conv = await chat.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        message: {
          orderBy: {
            Date_Houre: "desc",
          },
          take: 20,
          skip: 20 * number,
          include: {
            item: {
              select: {
                image: {
                  take: 1,
                },
                Price: true,
                Size: true,
              },
            },
          },
        },
      },
    });

    const convMessage = {
      message: conv.message,
    };

    res.status(200).json(convMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Serveur error");
  }
});

router.get("/myConversation", auth, async (req, res) => {
  const { id } = req.user;

  try {
    let myConversation = await chat.findMany({
      where: {
        OR: [
          {
            id_Account_1: id,
          },
          {
            id_Account_2: id,
          },
        ],
        AND:[
            {OR:[
                {NOT:{
                    message:{
                        every:{
                            Text:null
                        }
                    }
                }},
                {NOT:{
                    message:{
                        every:{
                            id_Item:null
                        }
                    }
                }},
               
            ]}
        ],
        
      },
      
      
      
      


      select: {
        message: {
          take:1,
          orderBy:{
            Date_Houre:"desc"
          },

          
        },

        id:true,

        
        account_accountTochat_id_Account_2: {
          select: {
            Pseudo: true,
            id:true
          },
        },
        account_accountTochat_id_Account_1: {
          select: {
            Pseudo: true,
            id:true
          },
        },

      }
      
    });

   
    res.status(200).json(myConversation);
  } catch (error) {
    console.log(error);
    res.status(500).send("Serveur error : conversation");
  }
});

module.exports = router;
