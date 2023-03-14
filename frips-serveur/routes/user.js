const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const { account } = new PrismaClient();

const log4js = require("log4js");
var logger = log4js.getLogger("user");

// @route   POST api/users
// @desc    Register user
// @acces    Public

router.post("/checkUser", async (req, res) => {
  let { Pseudo, Email } = req.body;
  try {
    let user = await account.findUnique({
      where: {
        Pseudo,
      },
      select: {
        Pseudo: true,
      },
    });

    let email = await account.findUnique({
      where: {
        Email,
      },
      select: {
        Email: true,
      },
    });

    if (user || email) {
      if (user && email) {
        logger.info("Pseudo and email already used" + Pseudo + " " + Email)
        res
          .status(400)
          .json({ msg: "Ce pseudo et ce mail sont déjà utilisés" });
      } else if (user) {
        logger.info("Pseudo already used" + Pseudo)
        res.status(400).json({ msg: "Ce pseudo est déjà utilisé" });
      } else {
        logger.info("Email already used" + Email)
        res.status(400).json({ msg: "Ce mail est déjà utilisé" });
      }
    }
    else{
      logger.info("Pseudo and email available" + Pseudo + " " + Email)
      res.status(200).json({ msg: "ok" });
    }


  } catch (error) {
    logger.error("POST /checkUser" + error)
    res.status(500).send("Serveur error");
  }
});

router.post("/", async (req, res) => {
  let {
    Pseudo,
    Email,
    Password,
    IBAN,
    Mois,
    Jour,
    Annee,
    name,
    firstName,
    Rue,
    Numero,
    Localite,
    NPA,
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  Password = await bcrypt.hash(Password, salt);

  try {
    let user = await account.findUnique({
      where: {
        Pseudo,
      },
      select: {
        Pseudo: true,
      },
    });

    let email = await account.findUnique({
      where: {
        Email,
      },
      select: {
        Email: true,
      },
    });

    if (user || email) {
      if (user && email) {
        logger.info("Pseudo and email already used" + Pseudo + " " + Email)
        res
          .status(400)
          .json({ msg: "Ce pseudo et ce mail sont déjà utilisés" });
      } else if (user) {
        logger.info("Pseudo already used" + Pseudo)
        res.status(400).json({ msg: "Ce pseudo est déjà utilisé" });
      } else {
        logger.info("Email already used" + Email)
        res.status(400).json({ msg: "Ce mail est déjà utilisé" });
      }
    } else {
      const newUser = await account.create({
        data: {
          Pseudo,
          Email,
          Password,
          Lastname: name,
          Firstname: firstName,
          BirthDate: new Date(parseInt(Annee), parseInt(Mois), parseInt(Jour)),
          address: {
            create: {
              City: Localite,
              NPA: parseInt(NPA),
              NumStreet: Numero,
              Street: Rue,
            },
          },
          IBAN
        },
      });

      const payload = {
        user: {
          id: newUser.id,
        },
      };
      
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          logger.info("New user created" + Pseudo + " " + Email)
          res.json({ token });
        }
      );
    }

    //encrypt password
  } catch (error) {
    logger.error("POST /" + error)
    res.status(500).send("Serveur error");
  }
});

module.exports = router;
