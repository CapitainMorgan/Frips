const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const { nanoid } = require("nanoid");
let fs = require("fs-extra");
const path = require("path"); // path for cut the file extension

const { item, account, image, message, sell } = new PrismaClient();

// @route   GET api/members/myFrips
// @desc    get all your post
// @acces    Private

router.get("/members", auth, async (req, res) => {
  const { id } = req.user;

  const MyFrips = await item.findMany({
    where: {
      id_Seller: id,
    },
    include: {
      account_item: true,
    },
  });

  res.status(200).json(MyFrips);
});

// @route   get api/members/myFrips
// @desc    get all your post
// @acces    Private

const upload = multer().single("singleImage");

router.post("/myProfile", auth, upload, async (req, res) => {
  const { id } = req.user;
  console.log(id);

  try {
    let pathDir = `public/imageProfile/${id}`;
    fs.mkdirsSync(pathDir);
    console.log(req.file);

    let idImage = nanoid();
    fs.writeFileSync(
      path.join(
        "./",
        pathDir,
        `${idImage}` + path.extname(req.file.originalname)
      ),
      req.file.buffer,
      "UTF8"
    );

    const changeProfileImage = await image.upsert({
      where: {
        id_Account: id,
      },
      create: {
        image: `${idImage}` + path.extname(req.file.originalname),
      },
      update: {
        image: `${idImage}` + path.extname(req.file.originalname),
      },
    });
    console.log("here");
    console.log(changeProfileImage);

    res.status(200).json(changeProfileImage.image);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

// @route   get api/members/myFrips
// @desc    get all your post
// @acces    Private

router.get("/mySell", auth, async (req, res) => {
  const { id } = req.user;
  console.log(id);
  const MyFrips = await sell.findMany({
    where: {
      id_Account: id,
    },
    select: {
      image: {
        take: 1,
      },
      Price: true,
      id: true,
      Size: true,
      Name: true,

      item_brand: {
        select: {
          brand: {
            select: {
              Name: true,
            },
          },
        },
      },
    },
    orderBy: {
      DatePuplication: "desc",
    },
  });

  res.status(200).json(MyFrips);
});



router.get("/myFrips", auth, async (req, res) => {
  const { id } = req.user;

  const NumberItems = await item.count({
    where: {
      account:{
        id,
      }
    },
  });
  const MyFrips = await item.findMany({
    where: {
      id_Seller: id,
    },
    select: {
      image: {
        take: 1,
      },
      Price: true,
      id: true,
      Size: true,
      Name: true,
      pricepropose: {
        select: {
          Price: true,
          account: {
            select: {
              Pseudo: true,
              id: true,
              image: true,
            },
          },
        },
        orderBy: { Price: "desc" },
        take: 1,
      },
      _count: {
        select: {
          favorit: true,
          nbview: true,
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
    },
    orderBy: {
      DatePuplication: "desc",
    },
  });
  console.log(MyFrips.length);

  res.status(200).json(MyFrips);
});

module.exports = router;
