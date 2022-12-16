const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const {
  item,
  account,

  image,
  message,
  brand,
  color,
  category,
  itemcondition,
  category_category,
} = new PrismaClient();

// @route   GET api/members/myFrips
// @desc    get all your post
// @acces    Private

router.get("/search", async (req, res) => {
  try {
    const infoBrand = await brand.findMany({
      select:{
        Name:true,
        id:true
      },
      orderBy:{
        id:"asc"
      }
      
    });

    const infoCategory = await category.findMany({
      where: {
        category_category_categoryTocategory_category_id_Child: {
          some: {
            category_categoryTocategory_category_id_Parent: {
              category_category_categoryTocategory_category_id_Child: {
                some: {
                  id_Parent: {
                    in: [2, 73, 81, 89],
                  },
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        Name: true,
      },
    });

    const infoObject = [infoBrand, infoCategory];

    res.status(200).json(infoObject);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.get("/info", async (req, res) => {
  try {
    const infoBrand = await brand.findMany({
      select: {
        Name: true,
        id: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    const infoColor = await color.findMany({
      select: {
        Code: true,
        Name: true,
        id: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    const infoItemCondition = await itemcondition.findMany({
      select: {
        Description: true,
        Name: true,
        id: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    const infoCategory = await category.findMany({
      select: {
        id: true,

        Name: true,
        _count: true,
      },
    });

    const infoObject = {
      brandInfo: infoBrand,
      itemconditionInfo: infoItemCondition,
      itemColorInfo: infoColor,
      infoCategory,
    };

    res.status(200).json(infoObject);
  } catch (error) {
    console.log(error)
    res.status(500).json("Server error");
  }
});

module.exports = router;
