const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const { sendEmail } = require("../email/sendEmail");

const { account } = new PrismaClient();

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
        res
          .status(400)
          .json({ msg: "Ce pseudo et ce mail sont déjà utilisés" });
      } else if (user) {
        res.status(400).json({ msg: "Ce pseudo est déjà utilisé" });
      } else {
        res.status(400).json({ msg: "Ce mail est déjà utilisé" });
      }
    }
    else{
      res.status(200).json({ msg: "ok" });

    }


  } catch (error) {
    console.log(error);
    res.status(500).send("Serveur error");
  }
});

router.post("/", async (req, res,next) => {
  let {
    Pseudo,
    Email,
    Password,
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
        res
          .status(400)
          .json({ msg: "Ce pseudo et ce mail sont déjà utilisés" });
      } else if (user) {
        res.status(400).json({ msg: "Ce pseudo est déjà utilisé" });
      } else {
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
          LastConnection:new Date()
          
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
          res.json({ token });
        }
      );

      await sendEmail(newUser.id,"Welcome",next)

    }
    //encrypt password
  } catch (error) {
    console.log(error);
    res.status(500).send("Serveur error");
  }
});

module.exports = router;
