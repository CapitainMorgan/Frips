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

const {
  item,
  account,
  image,
  message,
  sell,

  pricepropose,
  transaction,
  review,
} = new PrismaClient();
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
  { Approve: { equals: null } },
  {
    Approve: {
      equals: false,
    },
  },
  { DateSell: "desc" },
  { DateSell: "asc" },
];

const constructFilter = (filterArray, type) => {
  const array = [];
  if (filterArray.length === 0 && type === "myFrips") {
    return [{ pricepropose: { _count: "desc" } }, { DatePuplication: "desc" }];
  }
  if (filterArray.length === 0 && type === "myProposition") {
    return [{ Approve: { equals: null } }];
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

const constructQueryMySell = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    arrayWhere.push({ DateSend: { equals: null } });
  }
  whereFilter.map((item) => {
    if (item === 10) {
      arrayWhere.push({ DateSend: { equals: null } });
    }
    if (item === 11) {
      arrayWhere.push({ DateSend: { not: { equals: null } } });
    }
  });
  return arrayWhere;
};

const constructQueryOrderByMySell = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    return arrayWhere;
  }
  whereFilter.map((item) => {
    if (item === 8) {
      arrayWhere.push({ DateSell: "desc" });
    }
    if (item === 9) {
      arrayWhere.push({ DateSell: "asc" });
    }
  });
  return arrayWhere;
};

router.post("/mySell", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;
  console.log(filter);
  console.log(constructQueryOrderByMySell(filter));
  try {
    const countMySell = await transaction.count({
      where: {
        OR: constructQueryMySell(filter),
      },
    });
    const mySell = await transaction.findMany({
      where: {
        OR: constructQueryMySell(filter),
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            id: true,
            Name: true,
            Price: true,
            item_fees: {
              select: {
                fees: {
                  select: {
                    Name: true,
                    Description: true,
                    Price: true,
                  },
                },
              },
            },

            DeliveryDetails: true,
          },
        },

        DateSell: true,
        DateSend: true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            address: true,
            Firstname: true,
            Lastname: true,
            Email: true,
          },
        },
        id: true,

        Price: true,
        Status: true,
      },
      orderBy: constructQueryOrderByMySell(filter),
      take: 5,
      skip: 5 * (number - 1),
    });

    if (countMySell === 0 && filter.length !== 0) {
      res.status(200).json({
        items: mySell,
        count: countMySell,
        msg: "Il n'y a aucune correspondance à votre recherche",
      });
    }
    if (countMySell === 0 && filter.length === 0) {
      res.status(200).json({
        items: mySell,
        count: countMySell,
        msg: "Vous avez envoyé toutes vos commandes",
      });
    } else {
      res.status(200).json({ items: mySell, count: countMySell, msg: "" });
    }
  } catch (error) {
    res.status(500).json("Servor Error");
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
            SendDate:true,
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
      orderBy: constructFilter(filter, "myFrips"),
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
            DateSend: {
              equals: null,
            },
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

const constructQueryMyProposition = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    arrayWhere.push({
      Approve: {
        equals: null,
      },
    });
  }

  whereFilter.map((item) => {
    if (item === 5) {
      arrayWhere.push({
        Approve: {
          equals: true,
        },
      });
    }
    if (item === 6) {
      arrayWhere.push({ Approve: { equals: null } });
    }
    if (item === 7) {
      arrayWhere.push({ Approve: { equals: false } });
    }
  });
  return arrayWhere;
};
router.post("/MyProposition", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;

  console.log(constructQueryMyProposition(filter, "myProposition"));
  console.log(filter);
  try {
    const count = await item.count({
      where: {
        pricepropose: {
          some: {
            AND: [
              {
                account: {
                  id,
                },
              },
              { OR: constructQueryMyProposition(filter) },
              {
                SendDate: {
                  gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                },
              },
            ],
          },
        },
      },
    });

    const MyProposition = await item.findMany({
      where: {
        pricepropose: {
          some: {
            AND: [
              {
                account: {
                  id,
                },
              },
              { OR: constructQueryMyProposition(filter) },
              {
                SendDate: {
                  gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                },
              },
            ],
          },
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

router.post("/Delivery", auth, async (req, res) => {
  const { id } = req.user;
  const { id_transaction } = req.body;

  try {
    await transaction.update({
      where: {
        id: id_transaction,
      },

      data: {
        DateSend: new Date(),
      },
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json("Servor Error");
    console.log(error);
  }
});

router.post("/Rewiew", auth, async (req, res) => {
  const { id } = req.user;
  const { id_transaction } = req.body;

  try {
    res.sendStatus(200);
    console.log(mySell);
  } catch (error) {
    res.status(500).json("Servor Error");
    console.log(error);
  }
});

router.post("/Received", auth, async (req, res) => {
  const { id } = req.user;
  const { id_transaction } = req.body;

  try {
    await transaction.update({
      where: {
        id: id_transaction,
      },
      data: {
        Status: "send",
      },
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json("Servor Error");
    console.log(error);
  }
});

const constructQueryMyPurchase = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    arrayWhere.push({
      Status: {
        equals: null,
      },
    });
  }
  whereFilter.map((item) => {
    if (item === 12) {
      arrayWhere.push({ Status: { equals: null } });
    }
    if (item === 13) {
      arrayWhere.push({ Status: { not: { equals: null } } });
    }
  });
  return arrayWhere;
};

const constructQueryOrderByMyPurchase = (whereFilter) => {
  const arrayWhere = [];

  if (whereFilter.length === 0) {
    return arrayWhere;
  }
  whereFilter.map((item) => {
    if (item === 14) {
      arrayWhere.push({ DateSell: "desc" });
    }
    if (item === 15) {
      arrayWhere.push({ DateSell: "asc" });
    }
  });
  return arrayWhere;
};

router.post("/MyPurchase", auth, async (req, res) => {
  const { id } = req.user;
  const { filter, number } = req.body;

  try {
    const countMyPurchase = await transaction.count({
      where: {
        AND: [
          {
            account: {
              id,
            },
          },
          { OR: constructQueryMyPurchase(filter) },
        ],
      },
    });
    const MyPurchase = await transaction.findMany({
      where: {
        AND: [
          {
            account: {
              id,
            },
          },
          { OR: constructQueryMyPurchase(filter) },
        ],
      },
      select: {
        item: {
          select: {
            image: {
              take: 1,
            },
            id: true,
            Name: true,
            account: {
              select: {
                Pseudo: true,
                id: true,
                address: true,
                Firstname: true,
                Lastname: true,
                Email: true,
              },
            },

            DeliveryDetails: true,
          },
        },
        DateSell: true,
        DateSend: true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            address: true,
            Firstname: true,
            Lastname: true,
            Email: true,
          },
        },
        id: true,

        Price: true,
        Status: true,
      },
      take: 5,
      skip: 5 * (number - 1),
      orderBy: constructQueryOrderByMyPurchase(filter),
    });

    if (countMyPurchase === 0 && filter.length === 0) {
      res.status(200).json({
        items: MyPurchase,
        count: countMyPurchase,
        msg: "Vous avez marquer reçu sur toutes vos commandes",
      });
    }
    if (countMyPurchase === 0 && filter.length !== 0) {
      res.status(200).json({
        items: MyPurchase,
        count: countMyPurchase,
        msg: "Il n'y a aucune correspondance à votre recherche",
      });
    } else {
      res
        .status(200)
        .json({ items: MyPurchase, count: countMyPurchase, msg: "" });
    }
  } catch (error) {
    res.status(500).json("Servor Error");
    console.log(error);
  }
});

router.post("/StatusProposition", auth, async (req, res) => {
  const { id } = req.user;
  const { id_Item, dateApprove } = req.body;

  console.log("here");
  try {
    const propose = await pricepropose.update({
      where: {
        id_Account_id_Item: {
          id_Account: id,
          id_Item,
        },
      },
      data: {
        dateApprove: Boolean(dateApprove) ? new Date() : false,
      },
    });

    console.log(propose);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json("Servor Error");
    console.log(error);
  }
});

module.exports = router;
