const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check,validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const multer = require("multer")
const upload = multer()
const fs = require("fs");
const {PrismaClient} =  require("@prisma/client")

const {item,account,image,message} = new PrismaClient()



const stripe = require("stripe")('pk_test_51KZuuOJdwWFTddizjmbjlnq1BToKGR0IPNfZwMvh4CKjanVwHY9uVQSerbTons0G6IeB4cdX4IoPFXt8QkChRvEK00ZzjMJEsC');

router.post("/create-payment-intent", async (req, res) => {

    console.log("SALUT C?EST ICI")
    const { items } = req.body;


    try {
        
        const itemInfo = await item.findFirst({
            rejectOnNotFound:true,
            where:{
                id:items.id
            },
            select:{
                Price:true,
                pricepropose:{
                    select:{
                        Approve:true,
                        Price:true,
                    }
                }
            }
        })


        console.log(itemInfo)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: itemInfo.Price,
                currency: "CHF",
                automatic_payment_methods: {
                  enabled: true,
                },
              });
            
              res.send({
                clientSecret: paymentIntent.client_secret,
              })

    } catch (error) {
        
    }
  
    // Create a PaymentIntent with the order amount and currency
    
  });
  

module.exports = router;