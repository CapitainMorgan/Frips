const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const { PrismaClient } = require("@prisma/client");

const { account, item, category_category, brand} = new PrismaClient();

// @route   POST api/users
// @desc    Register user
// @acces    Public

router.post("/", async (req, res) => {
  try {
    const result = await item.findMany({
      where: {
        OR: [
          { Description: { search: req.body.filter[0] } },
          {
            itemcondition: {
              Name: {
                in: req.body.filter,
              },
            },
          },
          {
            item_brand: {
              some: {
                brand: {
                  Name: {
                    search: "nik",
                  },
                },
              },
            },
          },
          {
            item_category: {
              some: {
                category: {
                  Name: {
                    in:req.body.filter,
                  },
                  
                },

              },
            },
          },
          {
            item_color: {
              some: {
                color: {
                  Name: {
                    in: req.body.filter,
                  },
                },
              },
            },
          },
        ],
      },
      select: {
        Name: true,

        item_brand: {
          select: {
            brand: {
              select: {
                Name: true,
                id: true,
              },
            },
          },
        },
        item_category: {
          select: {
            category: {
              select: {
                Name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});
router.post("/s", async (req, res) => {
  try {
  
   

    res.status(200).json([]);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});
module.exports = router;
