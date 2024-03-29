const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const { JSDOM } = require("jsdom");

const { PrismaClient } = require("@prisma/client");
const { sendEmail } = require("../email/sendEmail");
const { account, item, category_category, brand, chat, message ,transaction} =
  new PrismaClient();

// @route   POST api/users
// @desc    Register user
// @acces    Public

const createHTMLElement = (html) => {
  const { document } = new JSDOM(html).window;
  return document.body.firstChild;
};

router.post("/", async (req, res) => {
  const test = "nike air force"
  try {
    const tr = await transaction.aggregate({
      _sum:{
          TaxPrice:true
      },
      
      
  })

    res.status(200).json(tr)
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});
router.post("/s", async (req, res,next) => {
  const count = 0
  try {
    sendEmail(1,"Sell",next,{id_Item:1})

    res.status(200).json("ok")
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});
module.exports = router;
