const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const Stripe = require("stripe");
const auth = require("../middleware/auth");
const stripe = Stripe(
  "sk_test_51JfniQEK6bYR8YbaJaNW71dylmEjFAiuARhTXWgLyL6CKJWvTttrt95fdt8qYVLreTQqiFafvdsohrHN5mf7kW4s00l0TIXVOy"
);
const { item, account, image, message, transaction, pricepropose } =
  new PrismaClient();
const taxe = 1.07;

const customRound = (price) => {
  let decimal = price - Math.floor(price);
  return decimal >= 0.25 && decimal <= 0.75
    ? Math.floor(price) + 0.5
    : Math.round(price);
};

router.post("/createCheckoutPayment", auth, async (req, res) => {
  const { idItem, id_Fees } = req.body;

  console.log(id_Fees);
  try {
    const { Price, item_fees } = await item.findUnique({
      where: {
        id: idItem,
      },
      select: {
        Price: true,
        item_fees: {
          where: {
            id_Fees,
          },
          select: {
            fees: {
              select: {
                Price: true,
              },
            },
          },
        },
      },
    });

    const [{ fees }] = item_fees;
    const { Price: Price_Fees } = fees;

    const calculateOrderAmount = async (itemPrice) => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client

      return customRound(itemPrice * taxe) + Price_Fees;
    };
    const paymentIntent = await stripe.paymentIntents.create({
      amount: (await calculateOrderAmount(Price)) * 100,
      currency: "CHF",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/createCheckoutPaymentFromProposition", async (req, res) => {
  const { idItem } = req.body;

  try {
    const proposition = await pricepropose.findUnique({
      where: {
        id_Account_id_Item: {
          id_Account: 2,
          id_Item: 19,
        },
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            account: {
              select: {
                id: true,
                address: true,
                Firstname: true,
                Lastname: true,
              },
            },
            Name: true,
            item_fees: {
              select: {
                fees: {
                  select: {
                    Price: true,
                    Name: true,
                    Description: true,
                  },
                },
              },
            },
            item_brand: {
              select: {
                brand: {
                  select: {
                    Name: true,
                  },
                },
              },
            },
            Size: true,
            id: true,
          },
        },
        Price: true,
        Approve: true,
        SendDate: true,
      },
    });

    if (
      proposition.SendDate <
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    ) {
      res.status(200).json({
        client_secret: "",
        item: [],
        msg: "Oups la proposition est passée de date",
      });
    } else {
      res.status(200).json({ client_secret: "", item: proposition });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/info",auth, async (req, res) => {
  const {id} = req.user
  const { idItem, isFromProposition } = req.body;

  try {
    let itemInfo;

    if (idItem && !isFromProposition) {
      itemInfo = await item.findUnique({
        where: {
          id: idItem,
        },
        select: {
          Price: true,
          image: {
            take: 1,
          },
          account: {
            select: {
              id: true,
              address: true,
              Firstname: true,
              Lastname: true,
            },
          },
          Name: true,
          item_fees: {
            select: {
              fees: {
                select: {
                  Price: true,
                  Name: true,
                  Description: true,
                  id: true,
                },
              },
            },
          },
          item_brand: {
            select: {
              brand: {
                select: {
                  Name: true,
                },
              },
            },
          },
          Size: true,
          id: true,
        },
      });
    } else {
      const priceproposeItem = await pricepropose.findUnique({
        where: {
          id_Account_id_Item: {
            id_Account:id,
            id_Item: idItem,
          },
        },
        select: {
          Price: true,
          item: {
            select: {
              image: {
                take: 1,
              },
              account: {
                select: {
                  id: true,
                  address: true,
                  Firstname: true,
                  Lastname: true,
                },
              },
              Name: true,
              item_fees: {
                select: {
                  fees: {
                    select: {
                      Price: true,
                      Name: true,
                      Description: true,
                      id: true,
                    },
                  },
                },
              },
              item_brand: {
                select: {
                  brand: {
                    select: {
                      Name: true,
                    },
                  },
                },
              },
              Size: true,
              id: true,
            },
          },
        },
      });

      itemInfo = { ...priceproposeItem.item, Price: priceproposeItem.Price };
      console.log(itemInfo)
    }

    res.status(200).json({ client_secret: "", item:itemInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/reserved", auth, async (req, res) => {
  const { idItem, isReserved } = req.body;

  try {
    await item.update({
      where: {
        id: idItem,
      },
      data: {
        Disponibility: isReserved,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/succeed", auth, async (req, res) => {
  const { StripeIdentifier, idItem, id_Account, id_Fees } = req.body;

  console.log("ici")

  try {
    const { Price, item_fees } = await item.findUnique({
      where: {
        id: idItem,
      },
      select: {
        Price: true,
        item_fees: {
          where: {
            id_Fees,
          },
          select: {
            fees: {
              select: {
                Price: true,
              },
            },
          },
        },
      },
    });

    const [{ fees }] = item_fees;
    const { Price: Price_Fees } = fees;

    await transaction.create({
      data: {
        StripeIdentifier,
        DateSell: new Date(),
        id_Item: idItem,
        id_Account,
        Price: customRound(Price * taxe) + Price_Fees,
      },
    });

    res.status(200).json(`/payment/${idItem}/paymentStatus`);
  } catch (error) {
    console.log(error);
    res.status(500).json("Servor error");
  }
});

module.exports = router;
