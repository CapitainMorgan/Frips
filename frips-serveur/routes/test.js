const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const { JSDOM } = require("jsdom");

const { PrismaClient } = require("@prisma/client");
const MyComponent = require("../email/emailMessage");
const { sendEmailNewUser } = require("../email/sendEmailNewUser");
const { sendEmailSell } = require("../email/sendEmailSell");
const { sendEmailConfirmation } = require("../email/sendConfirmationSend");
const { account, item, category_category, brand, chat, message } =
  new PrismaClient();

// @route   POST api/users
// @desc    Register user
// @acces    Public

const createHTMLElement = (html) => {
  const { document } = new JSDOM(html).window;
  return document.body.firstChild;
};

router.post("/", async (req, res) => {
  try {
    const result = await res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});
router.post("/s", async (req, res) => {
  const count = 0
  try {
    sendEmailNewUser()  
    


  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});
module.exports = router;
