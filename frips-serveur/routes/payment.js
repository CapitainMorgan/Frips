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
let taxe = 1.07;

const customRound = (price) => {
  let decimal = price - Math.floor(price);
  return decimal >= 0.25 && decimal <= 0.75
    ? Math.floor(price) + 0.5
    : Math.round(price);
};

router.post("/createCheckoutPayment", auth, async (req, res) => {
  const { idItem, id_Fees } = req.body;

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
      if (customRound(itemPrice * taxe) - itemPrice <= 1) {
        return customRound(itemPrice + 1) + Price_Fees;
      } else {
        return customRound(itemPrice * taxe) + Price_Fees;
      }
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

router.post("/info", auth, async (req, res) => {
  const { id } = req.user;
  const { idItem, isFromProposition } = req.body;

  try {
    let itemInfo;
    const ifSold = await transaction.findFirst({
      where:{
        id_Item:idItem
      }
    })

    if (ifSold) {
      res.status(400).json("L'article a été vendu");
    } else {
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
            Disponibility: true,
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
              id_Account: id,
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
                Disponibility: true,
                Size: true,
                id: true,
              },
            },
          },
        });

        itemInfo = { ...priceproposeItem.item, Price: priceproposeItem.Price };
      }

      res.status(200).json({ client_secret: "", item: itemInfo });
    }
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
        Disponibility: true,
      },
    });

    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/isReserved", auth, async (req, res) => {
  const { idItem } = req.body;

  try {
    const { Disponibility } = await item.findFirst({
      where: {
        id: idItem,
      },
      select: {
        Disponibility: true,
      },
    });

    const updated = await item.update({
      where: {
        id: idItem,
      },
      data: {
        Disponibility: false,
      },
    });
    console.log(Disponibility);

    if (Disponibility) {
      res.status(200).json(Disponibility);
    } else {
      res
        .status(400)
        .json("Oups il semblerait que cet article ne soit plus disponible");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/succeed", auth, async (req, res) => {
  const { StripeIdentifier, idItem, id_Account, id_Fees, isFromProposition } =
    req.body;

  try {
    if (!isFromProposition) {
      const itemBought = await item.findUnique({
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
      const [{ fees }] = itemBought.item_fees;
      const { Price: DeliveryPrice } = fees;

      const tr = await transaction.create({
        data: {
          StripeIdentifier,
          DateSell: new Date(),
          id_Item: idItem,
          id_Account,
          Price: itemBought.Price,
          DeliveryPrice,
          TaxPrice:
            customRound(itemBought.Price * taxe) - itemBought.Price <= 1
              ? customRound(itemBought.Price + 1) - itemBought.Price
              : customRound(itemBought.Price * taxe) - itemBought.Price,
        },
      });
    } else {
      const { Price, item } = await pricepropose.findUnique({
        where: {
          id_Account_id_Item: {
            id_Account: id,
            id_Item: idItem,
          },
        },
        select: {
          Price: true,
          item: {
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
          },
        },
      });
      const [{ fees }] = item.item_fees;
      const { Price: DeliveryPrice } = fees;
      const tr = await transaction.create({
        data: {
          StripeIdentifier,
          DateSell: new Date(),
          id_Item: idItem,
          id_Account,
          Price: Price,
          DeliveryPrice,
          TaxPrice:
            customRound(Price * taxe) - Price <= 1
              ? customRound(Price + 1) - Price
              : customRound(Price * taxe) - Price,
        },
      });
    }
    res.status(200).json(`/payment/${idItem}/paymentStatus`);
  } catch (error) {
    console.log(error);
    res.status(500).json("Servor error");
  }
});

module.exports = router;
