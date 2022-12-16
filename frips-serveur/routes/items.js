const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const { nanoid } = require("nanoid");
let fs = require("fs-extra");
const path = require("path"); // path for cut the file extension
const { PrismaClient } = require('@prisma/client')
const { similarProduct } = require("./logicFunction/logicSimilarProduct");

const {
  item,
  account,
  image,
  nbview,
  pricepropose,
  

  favorit,
  
  color,
  brand,
  
  
  
  item_color,
  item_category,
  category,
} = new PrismaClient();

// @route   Post api/items
// @desc    post one item
// @acces    Private

const upload = multer().any();

const colorLengthFunction = (Color) => {
  const [firstColor, SecondColor] = Color;

  if (Color.length == 2) {
    return {
      createMany: {
        data: [
          { id_Color: parseInt(firstColor) },

          { id_Color: parseInt(SecondColor) },
        ],
      },
    };
  } else {
    return {
      create: {
        data: {
          id_Color: parseInt(firstColor),
          id_Item: Item.id,
        },
      },
    };
  }
};

router.post("/", auth, upload, async (req, res) => {
  const { id } = req.user;
  const Name = req.body.Titre;
  const Size = req.body.Size;
  const DatePuplication = await new Date();
  const Description = req.body.Description;
  const Price = parseFloat(req.body.Price);
  const Catalogue = req.body.Catalogue;
  const CurrentAuction = true;
  const State = parseInt(req.body.State);
  const Brand = req.body.Brand;

  try {
    const exist = await brand.upsert({
      where: {
        Name: Brand,
      },
      create: {
        Name: Brand
      },
      update: {},
    });

    const Item = await item.create({
      data: {
        Name,
        Description,
        Size,
        Price,
        DatePuplication,
        
        id_Seller: id,
        CurrentAuction,
        item_category: {
          create: {
            id_Category: parseInt(Catalogue),
          },
        },
        item_color: colorLengthFunction(req.body.Color),

        id_ItemCondition: State,
        item_brand: {
          create: {
            id_Brand: exist.id,
          },
        },
      },
    });

    let pathDir = `public/images/${Item.id}`;

    fs.mkdirsSync(pathDir);

    for (let index = 0; index < req.files.length; index++) {
      let id = nanoid();
      fs.writeFileSync(
        path.join(
          "./",
          pathDir,
          `${id}` + path.extname(req.files[index].originalname)
        ),
        req.files[index].buffer,
        "UTF8"
      );
      await image.create({
        data: {
          id_Item: Item.id,
          image: `${id}` + path.extname(req.files[index].originalname),
        },
      });
    }

    res.status(200).json(Item);
  } catch (error) {
    console.log(error);
    await item.delete({
      where: {
        id: Item.id,
      },
    });
    res.status(500).json("Server error");
  }
});

// @route   Post api/items
// @desc    post one item
// @acces    Private

router.get("/", async (req, res) => {
  try {
    const Item = await item.findMany({
      include: {
        image: {
          take: 1,
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

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: {
              select: {
                image: true,
              },
            },
            id: true,
          },
        },
      },
      orderBy: {
        DatePuplication: "desc",
      },
      take: 10,
    });

    res.status(200).json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.post("/ItemForPorpose", async (req, res) => {
  const { id } = req.body;

  try {
    const Item = await item.findMany({
      where: {
        account: {
          id: id,
        },
      },
      include: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
          },
        },
      },
      take: -10,
    });

    res.status(200).json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.get("/auth", auth, async (req, res) => {
  try {
    const Item = await item.findMany({
      include: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
          },
        },
        favorit: {
          where: {
            id_Account: {
              equals: req.user.id,
            },
          },
        },
      },

      take: -4,
    });

    res.status(200).json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.get("/filterCataloguePagination", async (req, res) => {
  try {
    const Item = await item.findMany({
      include: {
        image: {
          take: 1,
        },

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
        item_color: {
          select: {
            color: {
              select: {
                Code: true,
                Name: true,
                id: true,
              },
            },
          },
        },
        itemcondition: {
          select: {
            id: true,
            Description: true,
            Name: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
          },
        },
      },
      orderBy: {
        DatePuplication: "desc",
      },
      take: 5,
    });

    res.status(200).json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

const priceRange = (Price) => {
  if (Price[0] !== 0 && Price[1] === null) {
    return { AND: [{ Price: { gte: Price[0] } }] };
  }

  if (Price[1] !== null && Price[0] == 0) {
    return { AND: [{ Price: { lte: Price[1] == null ? 1000000 : Price[1] } }] };
  }

  if (Price[1] !== null && Price[0] !== 0) {
    return {
      AND: [{ Price: { gte: Price[0] } }, { Price: { lte: Price[1] } }],
    };
  }

  return;
};

const filterCatalogue = (Catalogue) => {
  return {
    item_category: {
      some: {
        OR: [
          {
            id_Category: {
              in: Catalogue,
            },
          },
          {
            category: {
              OR: [
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              id_Parent: {
                                in: Catalogue,
                              },
                            },
                          },
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      id_Parent: {
                        in: Catalogue,
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              category_categoryTocategory_category_id_Parent: {
                                category_category_categoryTocategory_category_id_Child:
                                  {
                                    some: {
                                      id_Parent: {
                                        in: Catalogue,
                                      },
                                    },
                                  },
                              },
                            },
                          },
                      },
                    },
                  },
                },
                {
                  category_category_categoryTocategory_category_id_Child: {
                    some: {
                      category_categoryTocategory_category_id_Parent: {
                        category_category_categoryTocategory_category_id_Child:
                          {
                            some: {
                              category_categoryTocategory_category_id_Parent: {
                                category_category_categoryTocategory_category_id_Child:
                                  {
                                    some: {
                                      category_categoryTocategory_category_id_Parent:
                                        {
                                          category_category_categoryTocategory_category_id_Child:
                                            {
                                              some: {
                                                id_Parent: {
                                                  in: Catalogue,
                                                },
                                              },
                                            },
                                        },
                                    },
                                  },
                              },
                            },
                          },
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };
};
const isFilter = (filter) => {
  const { newCatalogue, newCouleur, newEtat, newMarque, Price, itemsId } =
    filter;

  if (
    newCatalogue.length !== 0 ||
    newCouleur.length !== 0 ||
    newEtat.length !== 0 ||
    newMarque.length !== 0 ||
    Price[0] !== 0 ||
    Price[1] !== null
  ) {
    return {
      OR: [
        { id_ItemCondition: { in: newEtat } },
        { item_color: { some: { id_Color: { in: newCouleur } } } },
        {
          item_brand: {
            some: {
              id_Brand: { in: newMarque },
            },
          },
        },
        filterCatalogue(newCatalogue),

        priceRange(Price),
      ],
    };
  } else return;
};

const isSorted = (sortedId) => {
  if (sortedId == null) return;
  if (sortedId == 1) {
    return { Price: "asc" };
  }

  if (sortedId == 0) {
    return { Price: "desc" };
  }
};

router.post("/pagination", async (req, res) => {
  const { number } = req.body;
  const {
    newCatalogue,
    newCouleur,
    newEtat,
    newMarque,
    Price,
    itemsId,
    sortedBy,
  } = req.body;

  try {
    const count = await item.count({
      where: isFilter(req.body),
    });

    const Item = await item.findMany({
      where: isFilter(req.body),
      include: {
        image: {
          take: 1,
        },

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
        item_color: {
          select: {
            color: {
              select: {
                Code: true,
                Name: true,
                id: true,
              },
            },
          },
        },
        itemcondition: {
          select: {
            id: true,
            Description: true,
            Name: true,
          },
        },
        item_category: {
          select: {
            category: {
              select: {
                Name: true,
              },
            },
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: true,
          },
        },
      },

      orderBy: [isSorted(sortedBy?.id), { DatePuplication: "desc" }],
      skip: 5 * (number - 1),

      take: 5,
    });

    res.status(200).json({ items: Item, count: count });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.post("/more", async (req, res) => {
  const { number } = req.body;

  try {
    const Item = await item.findMany({
      include: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: {
              select: {
                image: true,
              },
            },
            id: true,
          },
        },
      },
      orderBy: {
        DatePuplication: "desc",
      },
      take: 10,
      skip: 10 * number,
    });
    res.status(200).json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.get("/new", async (req, res) => {
  try {
    const Item = await item.findMany({
      include: {
        image: {
          take: 1,
        },
        item_brand: {
          select: {
            brand: true,
          },
        },
        item_color: {
          select: {
            color: {
              select: {
                Name: true,
              },
            },
          },
        },
        itemcondition: {
          select: {
            Name: true,
          },
        },

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: true,
          },
        },
      },

      take: -5,
    });

    res.status(200).json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.get("/Id_of_MyFavorite", auth, async (req, res) => {
  try {
    const favoriteIDs = await favorit.findMany({
      where: {
        id_Account: req.user.id,
      },
      select: {
        id_Item: true,
      },
    });

    res.status(200).json(favoriteIDs);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.post("/proposition", auth, async (req, res) => {
  const {Price,idItem} = req.body
  try {
    await pricepropose.create({
      
      data:{
        Price:parseFloat(Price),
        id_Item:idItem,
        id_Account:req.user.id,
        Approve:false,
      }
    })

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

/* select:{
    favorit:{
        where:{
            id_Account:req.user.id
        },
        select:{
            id_Item:true
        }
    }
}*/

// @route   Post api/items
// @desc    post one item
// @acces    Private

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let Item = await item.findUnique({
      where: {
        id: parseInt(id),
      },

      select: {
        image: true,
        Name:true,
        account: {
          select: {
            Pseudo: true,
            id: true,
            item: {
              take: 12,
              include: {
                item_brand: {
                  select: {
                    brand: {
                      select: {
                        Name: true,
                      },
                    },
                  },
                },
                image: {
                  take: 1,
                },
                item_category: {
                  select: {
                    category: {
                      select: {
                        Name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        Description: true,
        Price: true,
        Size: true,
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
        item_color: {
          select: {
            color: {
              select: {
                Name: true,
              },
            },
          },
        },
        itemcondition: {
          select: {
            Name: true,
          },
        },
        id: true,
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
 
    const userItem = await item.findMany({
      where: {
        id_Seller: Item.account.id,
      },
      orderBy: {
        DatePuplication: "desc",
      },
      select: {
        image: {
          take: 1,
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
        id: true,
        Price: true,
        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            id: true,
            image: true,
          },
        },
      },
      take: 6,
    });
    
    console.log(Item.item_category[0].category.Name);
    const findedSimilarProduct = await similarProduct(
      Item.item_brand[0].brand.id,
      Item.item_category[0].category.id
    );

    Item = {
      ...Item,
      userItem,
      findedSimilarProduct,
    };
    res.status(200).json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.post("/favorit", auth, async (req, res) => {
  try {
    const exist = await favorit.findUnique({
      where: {
        id_Account_id_Item: {
          id_Item: req.body.id,
          id_Account: req.user.id,
        },
      },
      select: {
        item: true,
      },
    });

    if (exist) {
      await favorit.delete({
        where: {
          id_Account_id_Item: {
            id_Item: req.body.id,
            id_Account: req.user.id,
          },
        },
      });
      res.status(200).json("upload");
    } else {
      await favorit.create({
        data: {
          id_Account: req.user.id,
          id_Item: req.body.id,
        },
      });
      res.status(200).json("ok");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.post("/view",auth,async (req,res)=>{
  const idUser = req.user.id
  const {id} = req.body
  console.log("here")
  console.log(req.body)
  try {
    await nbview.upsert({
      where:{
        id_Account_id_Item:{
          id_Account:idUser,
          id_Item:id
        }
      },
      create:{
        id_Account:idUser,
        id_Item:id
      },
      update:{}
    })
    res.status(200).json("viewed")
  } catch (error) {
    console.log("view")
    console.log(error)
  }
})

router.delete("/favorit", auth, async (req, res) => {
  try {
    await favorit.delete({
      where: {
        id_Account_id_Item: {
          id_Item: req.body.id,
          id_Account: req.user.id,
        },
      },
      select: {
        item: true,
      },
    });

    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.post("/favorit/all", auth, async (req, res) => {
  const { id } = req.user;
  const { pagination } = req.body;
  try {
    const count = await item.count({
      where: {
        favorit: {
          some: {
            id_Account: id,
          },
        },
      },
    });
    const Item = await item.findMany({
      where: {
        favorit: {
          some: {
            id_Account: id,
          },
        },
      },
      include: {
        image: {
          take: 1,
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

        _count: {
          select: {
            favorit: true,
          },
        },
        account: {
          select: {
            Pseudo: true,
            image: {
              select: {
                image: true,
              },
            },
            id: true,
          },
        },
      },
      orderBy: {
        DatePuplication: "desc",
      },

      take: 6,
      skip: 6 * (pagination - 1),
    });

    res.status(200).json({ items: Item, count });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.post("/search", auth, async (req, res) => {
  try {
    const result = await item.findMany({
      where: {
        OR: [
          { Description: { in: req.body.filter } },
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
                    in: req.body.filter,
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
                    in: req.body.filter,
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
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

router.post("/search", auth, async (req, res) => {
  try {
    const result = await item.findMany({
      where: {
        OR: [
          { Description: { in: req.body.filter } },
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
                    in: req.body.filter,
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
                    in: req.body.filter,
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
        item_color: {
          select: {
            color: {
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


module.exports = router;