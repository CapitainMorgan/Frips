const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const { nanoid } = require("nanoid");
let fs = require("fs-extra");
const path = require("path"); // path for cut the file extension

const { item, account, image, message, sell, pricepropose, transaction } =
  new PrismaClient();
// @route   GET api/members/myFrips
// @desc    get all your post
// @acces    Private

const filterArrayItems = [
  {
    nbview: {
      _count: "desc",
    },
  },
  {
    favorit: {
      _count: "desc",
    },
  },
  {
    pricepropose: {
      _count: "desc",
    },
  },
  { DatePuplication: "asc" },
  { DatePuplication: "desc" },

  {
    Approve: {
      equals: true,
    },
  },
  { Approve: {} },
  {
    Approve: {
      equals: false,
    },
  },
  { DateSell: "desc" },
  { DateSell: "asc" },
];

const constructFilter = (filterArray, useful) => {
  const array = [];
  if (filterArray.length === 0 && useful) {
    return [
      { DatePuplication: "desc" },
      {
        pricepropose: {
          _count: "desc",
        },
      },
    ];
  }
  filterArrayItems.forEach((element, index) => {
    if (_.includes(filterArray, index)) {
      array.push(element);
    }
  });
  return array;
};

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

const upload = multer().single("singleImage");

router.post("/myProfile", auth, upload, async (req, res) => {
  const { id } = req.user;
  try {
    let pathDir = `public/imageProfile/${id}`;
    fs.mkdirsSync(pathDir);

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
        id_Account: id,
        image: `${idImage}` + path.extname(req.file.originalname),
        confidencial: false,
      },
      update: {
        image: `${idImage}` + path.extname(req.file.originalname),
        confidencial: false,
      },
    });

    res.status(200).json(changeProfileImage.image);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/updateAddress", auth, async (req, res) => {
  const { id } = req.user;
  const { Rue, Numero, Localite, NPA } = req.body;
  console.log(req.body);
  try {
    const { address } = await account.update({
      where: {
        id,
      },
      data: {
        address: {
          update: {
            City: Localite,
            NPA: parseInt(NPA),
            NumStreet: Numero,
            Street: Rue,
          },
        },
      },
      select: {
        address: true,
      },
    });
    res.status(200).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

// @route   get api/members/myFrips
// @desc    get all your post
// @acces    Private

const constructWhere = (whereFilter) => {
  if (whereFilter.length === 0) {
    return [{ DateSend: { equals: null } }];
  }
  const arrayWhere = [];
  whereFilter.map((item) => {
    if (item === 10) {
      arrayWhere.push({ DateSend: { equals: null } });
    }
    if (item === 11) {
      arrayWhere.push({ DateSend:{not:{equals:null}} });
    }
  });
  return arrayWhere;
};

router.post("/mySell", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;
  console.log("here");
  console.log(filter);

  try {
    const countMySell = await transaction.count({
      where: {
        OR:constructWhere(filter)
      },
          });
    const mySell = await transaction.findMany({
      where: {
        OR:constructWhere(filter)
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            id: true,
            Name: true,

            DeliveryDetails: true,
          },
        },
        DateSell:true,
        DateSend:true,
        account:{select:{
          Pseudo:true,
          id:true
        }},
        Price:true,
        Status:true
      },

      orderBy: constructFilter(filter),
      take: 5,
      skip: 5 * (number - 1),
    });

    res.status(200).json({items:mySell,count:countMySell});
    console.log(mySell);
  } catch (error) {
    res.status(500).json("Servor Error")
    console.log(error);
  }
});

router.post("/myFrips", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;
  try {
    const count = await item.count({
      where: {
        account: {
          id,
        },
        transaction: {
          none: {},
        },
      },
    });
    const MyFrips = await item.findMany({
      where: {
        id_Seller: id,
        transaction: {
          none: {},
        },
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
            Approve: true,
            dateApprove: true,
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
      take: 5,
      skip: 5 * (number - 1),
      orderBy: constructFilter(filter, true),
    });
    console.log(MyFrips);

    res.status(200).json({ items: MyFrips, count });
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.get("/myFripsNotifications", auth, async (req, res) => {
  const { id } = req.user;
  try {
    const resultReceivedProposition = await item.findMany({
      where: {
        account: {
          id,
        },
        transaction: {
          some: {
            Status: {},
          },
        },
      },
      select: {
        id: true,
      },
    });

    const resultsSell = await item.findMany({
      where: {
        account: {
          id,
        },
        transaction: {
          some: {
            Status: {},
          },
        },
      },
      select: {
        id: true,
      },
    });

    const resultsProposition = await item.findMany({
      where: {
        pricepropose: {
          some: {
            id_Account: id,
            SendDate: {
              gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            },
          },
        },
      },
      select: {
        id: true,
      },
    });

    res.status(200).json({ resultsSell, resultsProposition });
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

router.post("/MyProposition", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;
  console.log(constructFilter(filter));

  try {
    const count = await item.count({
      where: {
        pricepropose: {
          some: {
            AND: [{ id_Account: id }, { OR: constructFilter(filter) }],
          },
        },
      },
    });

    const MyProposition = await item.findMany({
      where: {
        pricepropose: {
          some: {
            AND: [{ id_Account: id }, { OR: constructFilter(filter) }],
          },
        },
        transaction: {
          some: {},
        },
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
            Approve: true,
            Price: true,
            dateApprove: true,
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
      take: 5,
      skip: 5 * (number - 1),
    });

    res.status(200).json({ items: MyProposition, count });
  } catch (error) {
    console.log(error);
    res.status(500).json("Serveur error");
  }
});

module.exports = router;
