const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const Stripe = require("stripe");
const auth = require("../middleware/auth");
const stripe = Stripe(
  "sk_test_51JfniQEK6bYR8YbaJaNW71dylmEjFAiuARhTXWgLyL6CKJWvTttrt95fdt8qYVLreTQqiFafvdsohrHN5mf7kW4s00l0TIXVOy"
);
const { item, account, image, message, transaction } = new PrismaClient();
const taxe = 1.07;

router.post("/createCheckoutPayment", auth, async (req, res) => {
  const { idItem } = req.body;

  try {
    const itemInfo = await item.findUnique({
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
        DeliveryDetails: true,
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

    
    const calculateOrderAmount = async (itemPrice) => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      return itemPrice * taxe;
    };
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(((await calculateOrderAmount(itemInfo.Price)) * 100)),
      currency: "CHF",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ client_secret: paymentIntent.client_secret, item: itemInfo });
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
router.post("/info", async (req, res) => {
  const { id } = req.body;
  try {
    const itemInfo = await item.findUnique({
      where: {
        id,
      },
      select: {
        image: {
          take: 1,
        },
        account: {
          select: {
            id: true,
            address: true,
          },
        },
        Price: true,
      },
    });

    res.send(null);
  } catch (error) {
    console.log(error);
    res.status(500).json("Servor error");
  }
});
router.post("/succeed", auth, async (req, res) => {
  const { StripeIdentifier, idItem, id_Account } = req.body;
  try {
    const { Price } = await item.findUnique({
      where: {
        id: idItem,
      },
      select: {
        Price: true,
      },
    });
    const s = await transaction.create({
      data: {
        StripeIdentifier,
        DateSell: new Date(),
        id_Item: idItem,
        id_Account,
        Price: (Price * 1.07.toFixed(2)),
      },
    });

    res.status(200).json(`/payment/${idItem}/paymentStatus`);
  } catch (error) {
    console.log(error);
    res.status(500).json("Servor error");
  }
});

module.exports = router;
