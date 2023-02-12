import React from "react";

import { Box, Divider, IconButton, MenuItem } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { navigationCatalogue } from "./staticNavigationCatalogue";

export const Catalogue = [
  {
    id: 1,
    Name: "Femme",
    type: "list",
    subitems: [
      {
        upId: 1,
        Name: "Vêtements",

        id: 2,

        type: "list",

        subitems: [
          {
            Upid: 2,

            type: "list",

            Name: "Manteaux & vestes",
            id: 3,
            subitems: [
              {
                Upid: 3,
                type: "list",
                Name: "Manteaux",
                id: 4,
                subitems: [
                  {
                    Upid: 4,
                    sizeType: 0,
                    Name: "Parkas",

                    id: 5,
                  },
                  {
                    Upid: 4,
                    sizeType: 0,
                    Name: "Manteaux longs",

                    id: 6,
                  },
                  {
                    Upid: 4,

                    sizeType: 0,
                    Name: "Manteaux d'hivers",

                    id: 7,
                  },
                ],
              },
              {
                Upid: 3,

                type: "list",
                Name: "Vestes",
                id: 9,
                subitems: [
                  {
                    id: 10,
                    Upid: 9,
                    Name: "Blouson aviateur",
                    sizeType: 0,
                  },
                  {
                    id: 11,
                    Name: "Vestes en jean",
                    Upid: 9,
                    sizeType: 0,
                  },
                  {
                    id: 12,
                    Name: "Vestes en cuir ",
                    Upid: 9,
                    sizeType: 0,
                  },
                  {
                    id: 13,
                    Name: "Vestes légères",
                    Upid: 9,
                    sizeType: 0,
                  },
                  {
                    id: 14,
                    Name: "Vestes polaires",
                    Upid: 9,
                    sizeType: 0,
                  },
                ],
              },
              {
                Upid: 3,
                Name: "Manteaux & vestes",

                id: 15,
                sizeType: 0,
              },
            ],
          },
          {
            Upid: 2,

            type: "list",
            Name: "Sweats & sweats à capuche",

            id: 16,
            subitems: [
              {
                id: 17,
                sizeType: 0,
                Name: "Sweats à capuche",
                Upid: 16,
              },
              {
                id: 18,
                type: "list",
                Upid: 16,
                Name: "Sweats & sweats à capuche",
                subitems: [
                  {
                    id: 19,
                    Name: "Pulls col V",
                    Upid: 18,
                    sizeType: 0,
                  },
                  {
                    id: 20,
                    Name: "Pulls col roulé",
                    Upid: 18,
                    sizeType: 0,
                  },
                  {
                    id: 21,
                    Name: "Sweats longs",
                    Upid: 18,
                    sizeType: 0,
                  },
                  {
                    id: 22,
                    Name: "Pulls d'hiver",
                    Upid: 18,
                    sizeType: 0,
                  },
                  {
                    id: 23,
                    Name: "Autres sweats",
                    Upid: 18,
                    sizeType: 0,
                  },
                ],
              },
              {
                id: 25,
                Upid: 16,
                Name: "Autres Sweats & pull-overs",
              },
            ],
          },
          {
            Upid: 2,
            Name: "Blazers & tailleurs",

            type: "list",
            id: 26,
            subitems: [
              {
                Upid: 26,
                Name: "Blazers",
                id: 27,
                sizeType: 0,
              },
              {
                Upid: 26,
                Name: "Ensemble tailler/pantalon",
                id: 28,
                sizeType: 0,
              },
              {
                Upid: 26,
                Name: "Blazers & tailleurs",
                id: 29,
                sizeType: 0,
              },
            ],
          },
          {
            Upid: 2,
            Name: "Robes",

            type: "list",
            id: 30,
            subitems: [
              {
                Upid: 30,
                id: 31,
                Name: "Robes courtes",
                sizeType: 0,
              },
              {
                Upid: 30,
                id: 32,
                Name: "Robes longues",
                sizeType: 0,
              },
              {
                Upid: 30,
                Name: "Robes d'été",
                id: 33,
                sizeType: 0,
              },
              {
                Upid: 30,
                id: 34,
                Name: "Robes d'hiver",
                sizeType: 0,
              },
              {
                Upid: 30,
                id: 35,
                Name: "Robes chics",
                sizeType: 0,
              },
              {
                Upid: 30,
                id: 36,
                Name: "Robes sans bretelles",
                sizeType: 0,
              },
              {
                Upid: 30,
                id: 36,
                Name: "Robes sans bretelles",
                sizeType: 0,
              },

              {
                Upid: 30,
                id: 37,
                Name: "Robes de soirée",
                sizeType: 0,
              },
              {
                Upid: 30,
                id: 38,
                Name: "Robes de mariée",
                sizeType: 0,
              },
              {
                Upid: 30,
                id: 39,
                Name: "Autres robes",
                sizeType: 0,
              },
            ],
          },
          {
            Upid: 2,
            Name: "Jupes",
            type: "list",
            id: 40,
            subitems: [
              {
                Upid: 40,
                id: 41,
                Name: "Mini-jupes",
                sizeType: 0,
              },
              {
                Upid: 40,
                id: 42,
                Name: "Jupes mi-longues",
                sizeType: 0,
              },
              {
                Upid: 40,
                id: 43,
                Name: "Jupes longues",
                sizeType: 0,
              },
              {
                Upid: 40,
                id: 44,
                Name: "Jupes taille haute",
                sizeType: 0,
              },
              {
                Upid: 40,
                id: 45,
                Name: "Jupes tulipes",
                sizeType: 0,
              },
              {
                Upid: 40,
                id: 46,
                Name: "Jupes patineuses",
                sizeType: 0,
              },
              {
                Upid: 40,
                id: 47,
                Name: "Jupes patineuses",
                sizeType: 0,
              },
            ],
          },
          {
            Upid: 2,
            Name: "Haut et T-shirts",
            type: "list",
            id: 48,
            subitems: [
              {
                Upid: 48,
                Name: "Chemises",
                id: 49,
                sizeType: 0,
              },
              {
                Upid: 48,
                Name: "Blouses",
                id: 50,
                sizeType: 0,
              },
              {
                Upid: 48,
                Name: "T-shirts",
                id: 51,
                sizeType: 0,
              },
              {
                Upid: 48,
                Name: "Débardeurs",
                id: 52,
                sizeType: 0,
              },
              {
                Upid: 48,
                Name: "Tuniques",
                id: 53,
                sizeType: 0,
              },
              {
                Upid: 48,
                Name: "Tops courts",
                id: 53,
                sizeType: 0,
              },
            ],
          },
          {
            Upid: 2,
            Name: "Pantalons & leggings",

            type: "list",
            id: 56,
            subitems: [
              {
                Upid: 56,
                Name: "Pantalons skinny",
                id: 57,
                sizeType: 0,
              },
              {
                Upid: 56,
                Name: "Pantalons en cuir",
                id: 58,
                sizeType: 0,
              },
              {
                Upid: 56,
                Name: "Pantalons droits",
                id: 59,
                sizeType: 0,
              },
              {
                Upid: 56,
                Name: "Leggings",
                id: 60,
                sizeType: 0,
              },
              {
                Upid: 56,
                Name: "Pantalons skinny",
                id: 60,
                sizeType: 0,
              },
              {
                Upid: 56,
                Name: "Sarouels",
                id: 61,
                sizeType: 0,
              },
            ],
          },
          {
            upId: 2,
            Name: "Shorts",
            type: "list",
            id: 62,
            subitems: [
              {
                upId: 62,
                Name: "Shorts taille haute",
                id: 63,
                sizeType: 0,

              },
              {
                upId: 63,
                Name: "Shorts taille basse",
                id: 64,
                sizeType: 0,

              },
              {
                upId: 63,
                Name: "Shorts en jeans",
                id: 65,
                sizeType: 0,

              },
              {
                upId: 63,
                Name: "Shorts en cuir",
                id: 66,
                sizeType: 0,

              },
              {
                upId: 63,
                Name: "Shorts cargo",
                id: 67,
                sizeType: 0,

              },
            ],
          },
          {
            Upid: 2,
            Name: "Maillots de bain",
            id: 68,
            type: "list",
            subitems: [
              {
                upId: 68,
                Name: "Une pièce",
                id: 69,
                sizeType: 0,

              },
              {
                upId: 68,
                Name: "Deux pièces",
                sizeType: 0,

                id: 70,
              },
            ],
          },

          {
            Upid: 2,
            Name: "Autres vêtements",
            sizeType: 0,

            id: 72,
          },
        ],
      },
      {
        Upid: 1,

        type: "list",
        id: 73,
        Name: "Chaussures",
        subitems: [
          {
            id: 74,
            Name: "Bottes",
            upId: 73,
            sizeType: 1,
          },
          {
            id: 75,
            Name: "Bottines",
            upId: 73,
            sizeType: 1,
          },
          {
            id: 76,
            Name: "Chaussures à talons",
            upId: 73,
            sizeType: 1,
          },
          {
            id: 77,
            Name: "Chaussures plates",
            upId: 73,
            sizeType: 1,
          },

          {
            id: 78,
            Name: "Sneakers & Basket",
            upId: 73,
            sizeType: 1,
          },
          {
            id: 79,
            Name: "Sandales",
            upId: 73,
            sizeType: 1,
          },

          {
            id: 80,
            Name: "Autres chaussures",
            upId: 73,
            sizeType: 1,
          },
        ],
      },
      {
        Upid: 1,

        type: "list",
        Name: "Sacs",
        id: 81,
        subitems: [
          {
            Name: "Sacs à main",
            id: 82,
            upId: 81,
            siteType:2,
          },
          {
            Name: "Sacs en bandoulière",
            id: 83,
            upId: 81,
            siteType: 2,
          },
          {
            Name: "Sacs à dos",
            id: 84,
            upId: 81,
            siteType: 2,
          },
          {
            Name: "Pochette",
            id: 85,
            upId: 81,
            siteType: 2,
          },
          {
            Name: "Sacs banane",
            id: 86,
            upId: 81,
            siteType: 2,
          },
          {
            Name: "Sacs de sport",
            id: 87,
            upId: 81,
            siteType: 2,
          },
          {
            Name: "Autres sacs",
            id: 88,
            upId: 81,
            siteType: 2,
          },
        ],
      },
    ],
  },
  {
    id: 100,
    Name: "Homme",
    type: "list",
    subitems: [
      {
        id: 101,
        Name: "test",
      },
    ],
  },
  //HOMME HERE///
];

export const arraySize = [
  {
    id: "Femme",
    idNavigation: 1,
    Name: "Femme",
    type: "list",
    subitems: [
      {
        id: 1,
        Name: "Taille",
        subitems: [
          {
            Name: "XS / 34",
            id: "XS / 34",
          },
          {
            Name: "S / 36",
            id: "S / 36",
          },
          {
            Name: "M / 38",
            id: "M / 38",
          },
          {
            Name: "L / 40",
            id: "L / 40",
          },
          {
            Name: "Xl / 42",
            id: "Xl / 42",
          },
          {
            Name: "Autres",
            id: "Autres",
          },
        ],
      },
      {
        id: 2,
        Name: "Chassaures",

        subitems: [
          {
            Name: "35",
            plain: true,
            id: "35",
          },
          {
            Name: "36",
            plain: true,
            id: "36",
          },
          {
            Name: "37",
            plain: true,
            id: "37",
          },
          {
            Name: "38",
            plain: true,
            id: "38",
          },
          {
            Name: "39",
            plain: true,
            id: "39",
          },
          {
            Name: "40",
            plain: true,
            id: "40",
          },
          {
            Name: "41",
            plain: true,
            id: "41",
          },
          {
            Name: "42",
            plain: true,
            id: "42",
          },
          {
            Name: "43",
            plain: true,
            id: "43",
          },
          {
            Name: "35.5",
            id: "35.5",
          },
          {
            Name: "36.5",
            id: "36.5",
          },
          {
            Name: "37.5",
            id: "37.5",
          },
          {
            Name: "38.5",
            id: "38.5",
          },
          {
            Name: "39.5",
            id: "39.5",
          },
          {
            Name: "40.5",
            id: "40.5",
          },

          {
            Name: "Autres",
            id: "Autres",
          },
        ],
      },
      {
        id: 3,
        Name: "sac",
        subitems: [
          {
            Name: "grand",
            plain: true,
            id: "grand",
          },
          {
            Name: "petit",
            id: "petit",
            plain: true,
          },
        ],
      },
    ],
  },
  {
    idNavigation: 2,
    Name: "Homme",
    type: "list",
    id: "Homme",

    subitems: [
      {
        id: 2,
        subitems: [
          {
            Name: "36",
            plain: true,
          },
          {
            Name: "37",
            plain: true,
          },
          {
            Name: "38",
            plain: true,
          },
          {
            Name: "39",
            plain: true,
          },
          {
            Name: "40",
            plain: true,
          },
          {
            Name: "41",
            plain: true,
          },
          {
            Name: "42",
            plain: true,
          },
          {
            Name: "43",
            plain: true,
          },
          {
            Name: "44",
            plain: true,
          },
          {
            Name: "45",
            plain: true,
          },
          {
            Name: "46",
            plain: true,
          },

          {
            Name: "36.5",
          },
          {
            Name: "37.5",
          },
          {
            Name: "38.5",
          },
          {
            Name: "39.5",
          },
          {
            Name: "40.5",
          },
          {
            Name: "41.5",
          },
          {
            Name: "42.5",
          },
          {
            Name: "43.5",
          },
          {
            Name: "44.5",
          },
          {
            Name: "45.5",
          },
          {
            Name: "46.5",
          },

          {
            Name: "Autres",
          },
        ],
      },
      {
        id: 1,
        subitems: [
          {
            Name: "XS",
          },
          {
            Name: "S",
          },
          {
            Name: "M",
          },
          {
            Name: "L",
          },
          {
            Name: "Xl",
          },
          {
            Name: "Autres",
          },
        ],
      },
    ],
  },
];

export const listCategorie = (
  id = null,
  rank = null,
  setNavigationValue,
  classes,
  setcurrentItem,
  SelectableItem,
  setSize,
  mobile,
  setCa
) => {
  switch (rank.length) {
    case 0:
      return Catalogue.map((item) => {
        return (
          <Box width={"100%"} overflow="hidden">
            <MenuItem
              className={classes.BoxItem}
              disableFocusRipple
              disableTouchRipple
              onClick={(e) => {
                if (item.id === 1) {
                  setSize([0]);
                }
                if (item.id === 104) {
                  setSize([1]);
                }

                setNavigationValue([
                  ...rank,
                  { upId: item.Name, id: 0, array: item.subitems },
                ]);
              }}
            >
              {item.Name}
              <IconButton
                className={classes.Arrow}
                disableFocusRipple
                disableRipple
                disableTouchRipple
              >
                <ChevronRightIcon style={{ fontSize: 25 }} />{" "}
              </IconButton>
            </MenuItem>
            <Divider />
          </Box>
        );
      });
    case 1:
      return navigationCatalogue(
        id,
        rank,
        classes,
        setNavigationValue,
        setcurrentItem,
        SelectableItem,
        setSize,
        mobile
      );

    case 2:
      return navigationCatalogue(
        id,
        rank,
        classes,
        setNavigationValue,
        setcurrentItem,
        SelectableItem,
        setSize,
        mobile
      );

    case 3:
      return navigationCatalogue(
        id,
        rank,
        classes,
        setNavigationValue,
        setcurrentItem,
        SelectableItem,
        setSize,
        mobile
      );

    case 4:
      return navigationCatalogue(
        id,
        rank,
        classes,
        setNavigationValue,
        setcurrentItem,
        SelectableItem,
        setSize,
        mobile
      );
    default:
      return 0;
  }
};

export const renderArraySize = (size, selection) => {
  switch (selection) {
    case 1:
      return size[0].subitems[1].subitems;

    case 2:
      return size[0].subitems[0].subitems;

    case 3:
      return size[1].subitems[1].subitems;

    case "HC":
      return size[1].subitems[0].subitems;

    default:
      return size;
  }
};
