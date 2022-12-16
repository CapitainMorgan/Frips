const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51JfniQEK6bYR8YbaJaNW71dylmEjFAiuARhTXWgLyL6CKJWvTttrt95fdt8qYVLreTQqiFafvdsohrHN5mf7kW4s00l0TIXVOy"
);
const { item, account, image, message } = new PrismaClient();
const taxe = 1.07;

router.post("/createCheckoutPayment", async (req, res) => {
  const {idItem } = req.body;
  console.log(req.body)

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
            address:true,
            Firstname:true,
            Lastname:true
          },

        },
        Name:true,
        DeliveryDetails:true,
        item_brand:{
          select:{
            brand:{
              select:{
                Name:true
              }
            }
          }
        },
        Size:true,
        id:true

        
      },
    });
    const calculateOrderAmount = async (itemPrice) => {
      console.log(itemPrice)
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      return itemPrice * taxe;
    };
    const paymentIntent = await stripe.paymentIntents.create({
      amount: await calculateOrderAmount(itemInfo.Price)*100,
      currency: "CHF",
      automatic_payment_methods: {
        enabled: true,
      },
      
    });
    console.log(paymentIntent.client_secret)

    res.send({client_secret:paymentIntent.client_secret,item:itemInfo});
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
        id
      },
      select: {
        image: {
          take: 1,
        },
        account: {
          select: {
            id: true,
            address:true
          },
        },
        Price:true
      },
    });

    res.send(null);
  } catch (error) {
    console.log(error);
    res.status(500).json("Servor error");
  }
});

module.exports = router;
