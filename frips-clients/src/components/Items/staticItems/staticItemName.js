
import React , {useState,useRef, useEffect}from "react"
 
import { Select,MenuItem,Popover, Menu  } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { TextField,InputAdornment } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Divider } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { navigationCatalogue } from "./staticNavigationCatalogue";


export const Catalogue = [
    {
        id:1,
        Name:"Femme",
        type:"list",
        subitems:[
            {
                upId:1,
                Name:"Vêtements",
                
                id: 2,
            
                type:"list",




                subitems: [
                    {
                        Upid: 2,
                        
                        type:"list",

                        Name: "Manteaux & vestes",
                        id:3,
                        subitems:[
                            {
                                Upid: 3,
                                type:"list",
                                Name:"Manteaux",
                                id: 4,
                                subitems:[
                                    {
                                        Upid: 4,
                                        sizeType:"FV",
                                        Name:"Parkas",
                                      
                
                                        id: 5,
                                    },{
                                        Upid: 4,
                                        sizeType:"FV",
                                        Name:"Manteaux longs",

                    
                                      
                
                                        id: 6,
                                    },{
                                        Upid: 4,

                                        sizeType:"FV",
                                        Name:"Manteaux d'hivers",

                                        id: 7,
                                    },
                                ]
                            },
                            {

                                Upid:3,

                                type:"list",
                                Name:"Vestes",
                                id: 9,
                                subitems:[
                                    {
                                        id:10,
                                        Upid:9,
                                        Name:"Blouson aviateur",
                                        sizeType:"FV"
                                    },
                                    {
                                        id:11,
                                        Name:"Vestes en jean",
                                        Upid:9,
                                        sizeType:"FV"
                                    },
                                    {
                                        id:12,
                                        Name:"Vestes en cuir ",
                                        Upid:9,
                                        sizeType:"FV"
                                    },
                                    {
                                        id:13,
                                        Name:"Vestes légères",
                                        Upid:9,
                                        sizeType:"FV"
                                    },
                                    {
                                        id:14,
                                        Name:"Vestes polaires",
                                        Upid:9,
                                        sizeType:"FV"
                                    },
                                ]

                            }, {

                                Upid:3 ,
                                Name:"Manteaux & vestes",

                                id: 15,
                                sizeType:"FV",

                            },
                        ]
                    },
                    {
                        Upid: 2,
                        
                        type:"list",
                        Name:"Sweats & sweats à capuche",
                    
                        

                        id:16,
                        subitems:[
                            {
                                id:17,
                                sizeType:"FV",
                                Name:"Sweats à capuche",
                                Upid : 16

                            },{
                                id: 18,
                                type:"list",
                                Upid :16,
                                Name:"Sweats & sweats à capuche",
                                subitems:[
                                    {
                                        id:19,
                                        Name:"Pulls col V",
                                        Upid:18,
                                        sizeType:"FV"
                                    },
                                    {
                                        id:20,
                                        Name:"Pulls col roulé",
                                        Upid:18,
                                        sizeType:"FV"
                                    },
                                    {
                                        id:21,
                                        Name:"Sweats longs",
                                        Upid:18 ,
                                        sizeType:"FV"
                                    }, {
                                        id:22,
                                        Name:"Pulls d'hiver",
                                        Upid:18 ,
                                        sizeType:"FV"
                                    },{
                                        id:23,
                                        Name:"Autres sweats",
                                        Upid:18 ,
                                        sizeType:"FV"
                                    },
                                ]

                            },{
                                id: 25,
                                Upid : 16,
                                Name:"Autres Sweats & pull-overs",

                            },
                        ]
                    },
                    {
                        Upid: 2,
                        Name:"Blazers & tailleurs",
                    
                        type:"list",
                        id: 26,
                        subitems:[
                            {
                                Upid:26,
                                Name:"Blazers",
                                id:27,
                                sizeType:"FV"
                            },{
                                Upid:26,
                                Name:"Ensemble tailler/pantalon",
                                id:28,
                                sizeType:"FV"
                            },{
                                Upid:26,
                                Name:"Blazers & tailleurs",
                                id:29,
                                sizeType:"FV"
                            },
                        ]
                    },
                    {
                    Upid:2,
                    Name:"Robes",
                    
                        type:"list",
                        id:30,
                        subitems:[
                            {
                                Upid:30,
                                id:31,
                                Name:"Robes courtes",
                                sizeType:"FV"
                            },
                            {
                                Upid:30,
                                id:32,
                                Name:"Robes longues",
                                sizeType:"FV"
                            },
                            {
                                Upid:30,
                                Name:"Robes d'été",
                                id:33,
                                sizeType:"FV"
                            },
                            {
                                Upid:30,
                                id:34,
                                Name:"Robes d'hiver",
                                sizeType:"FV"
                            },
                            {
                                Upid:30,
                                id:35,
                                Name:"Robes chics",
                                sizeType:"FV"
                            },
                            {
                                Upid:30,
                                id:36,
                                Name:"Robes sans bretelles",
                                sizeType:"FV"
                                
                            },
                            {
                                Upid:30,
                                id:36,
                                Name:"Robes sans bretelles",
                                sizeType:"FV"
                            },
                            
                            {
                                Upid:30,
                                id:37,
                                Name:"Robes de soirée",
                                sizeType:"FV"
                            },
                            {
                                Upid:30,
                                id:38,
                                Name:"Robes de mariée",
                                sizeType:"FV"
                            }
                            ,
                            {
                                Upid:30,
                                id:39,
                                Name:"Autres robes",
                                sizeType:"FV"
                            }
                        ]
                    },
                    {
                    Upid: 2,
                        Name:"Jupes",
                        type:"list",
                        id: 40,
                        subitems:[
                            {
                                Upid:40,
                                id:41,
                                Name:"Mini-jupes",
                                sizeType:"FV" 
                            },{
                                Upid:40,
                                id:42,
                                Name:"Jupes mi-longues",
                                sizeType:"FV" 
                            },{
                                Upid:40,
                                id:43,
                                Name:"Jupes longues",
                                sizeType:"FV" 
                            },{
                                Upid:40,
                                id:44,
                                Name:"Jupes taille haute",
                                sizeType:"FV" 
                            },{
                                Upid:40,
                                id:45,
                                Name:"Jupes tulipes",
                                sizeType:"FV" 
                            },{
                                Upid:40,
                                id:46,
                                Name:"Jupes patineuses",
                                sizeType:"FV" 
                            },
                            {
                                Upid:40,
                                id:47,
                                Name:"Jupes patineuses",
                                sizeType:"FV" 
                            },
                        ]
                    },
                    {
                    Upid: 2,
                        Name:"Haut et T-shirts",
                        type:"list",
                        id: 48,
                        subitems:[
                            {
                                Upid:48,
                                Name:"Chemises",
                                id:49,
                                sizeType:"FV"
                            },{
                                Upid:48,
                                Name:"Blouses",
                                id:50,
                                sizeType:"FV"
                            },{
                                Upid:48,
                                Name:"T-shirts",
                                id:51,
                                sizeType:"FV"
                            },{
                                Upid:48,
                                Name:"Débardeurs",
                                id:52,
                                sizeType:"FV"
                            },{
                                Upid:48,
                                Name:"Tuniques",
                                id:53,
                                sizeType:"FV"
                            },{
                                Upid:48,
                                Name:"Tops courts",
                                id:53,
                                sizeType:"FV"
                            }
                        ]
                    },
                    {
                    Upid: 2,
                    Name:"Pantalons & leggings",
                    
                        type:"list",
                        id: 56,
                        subitems:[
                            {
                                Upid:56,
                                Name:"Pantalons skinny",
                                id:57,
                                sizeType:"FV"
                            },
                            {
                                Upid:56,
                                Name:"Pantalons en cuir",
                                id:58,
                                sizeType:"FV"
                            },
                            {
                                Upid:56,
                                Name:"Pantalons droits",
                                id:59,
                                sizeType:"FV"
                            },
                            {
                                Upid:56,
                                Name:"Leggings",
                                id:60,
                                sizeType:"FV"
                            },
                            {
                                Upid:56,
                                Name:"Pantalons skinny",
                                id:60,
                                sizeType:"FV"
                            },
                            {
                                Upid:56,
                                Name:"Sarouels",
                                id:61,
                                sizeType:"FV"
                            },
                        ]
                    },
                    {
                        upId:2,
                        Name:"Shorts",
                        type:"list",
                        id:62,
                        subitems:[
                            {
                                upId:62,
                                Name:"Shorts taille haute",
                                id:63
                            },
                            {
                                upId:63,
                                Name:"Shorts taille basse",
                                id:64
                            },
                            {
                                upId:63,
                                Name:"Shorts en jeans",
                                id:65
                            },
                            {
                                upId:63,
                                Name:"Shorts en cuir",
                                id:66
                            },
                            {
                                upId:63,
                                Name:"Shorts cargo",
                                id:67
                            }
                        ]
                    },
                    {
                        Upid:2,
                        Name: "Maillots de bain",
                        id:68,
                        type:"list",
                        subitems:[
                            {
                                upId:68,
                                Name:"Une pièce",
                                id:69
                            },
                            {
                                upId:68,
                                Name:"Deux pièces",
                                id:70
                            },
                        ]

                    },
                    
                   
                    {
                    Upid:2,
                    Name: "Autres vêtements",
                    id:72
                    }
                ]
            },
            {
                Upid: 1,
            
                type:"list",
                id: 73,
                Name:"Chaussures",
                subitems:[
                    {
                        id:74,
                        Name:"Bottes",
                        upId:73,
                        
                    }
                    ,{
                        id:75,
                        Name:"Bottines",
                        upId:73,
                    },{
                        id:76,
                        Name:"Chaussures à talons",
                        upId:73,
                    },
                    {
                        id:77,
                        Name:"Chaussures plates",
                        upId:73,
                    },
                    
                    
                    {
                        id:78,
                        Name:"Sneakers & Basket",
                        upId:73,
                    },
                    {
                        id:79,
                        Name:"Sandales",
                        upId:73,
                    },
                    
                    
                    {
                        id:80,
                        Name:"Autres chaussures",
                        upId:73,

                    },
                ]
            },
            {
                Upid: 1,

            
                type:"list",
                Name: "Sacs",
                id:81,
                subitems:[
                    {
                        Name:"Sacs à main",
                        id:82,
                        upId:81
                    },
                    {
                        Name:"Sacs en bandoulière",
                        id:83,
                        upId:81
                    },
                    {
                        Name:"Sacs à dos",
                        id:84,
                        upId:81
                    },
                    {
                        Name:"Pochette",
                        id:85,
                        upId:81
                    },
                    {
                        Name:"Sacs banane",
                        id:86,
                        upId:81
                    },
                    {
                        Name:"Sacs de sport",
                        id:87,
                        upId:81
                    },
                    {
                        Name:"Autres sacs",
                        id:88,
                        upId:81
                    },
                    
                    
                ]

            }
        ]
    },
    {
        id:100,
        Name:"Homme",
        type:"list",
        subitems:[
            {
                id:101,
        Name:"test",
        
            }
        ]
    }
   //HOMME HERE///
]


export const brand =[
    {
        brand:" H & M",
        popular:true,
        disponible:true,
    },
    {
        brand: "Zara",
        popular:true,
        disponible:true,
    },
    {
        brand: "C & A",
        popular:true,
        disponible:true,
    },{
        brand: "Nike",
        popular:true,
        disponible:true,
    },{
        brand: "Adidas",
        popular:true,
        disponible:true,
    },{
        brand: "Puma",
        popular:true,
        disponible:true,
    },{
        brand: "Decathlon",
        popular:true,
        disponible:true,
    },{
        brand: "Lacoste",
        popular:true,
        disponible:true,
    }
    ,{
        brand: "Uniqlo",
        popular:true,
        disponible:true,
    },{
        brand: "Prada",
        popular:true,
        disponible:true,
    },
    {
        brand: "Jack & Jones",
        popular:true,
        disponible:true,
    },
    {
        brand: "Pull & Bear",
        popular:true,
        disponible:true,
    },
    {
        brand: "Abercrombie & Fitch",
        popular:true,
        disponible:true,
    },
    {
        brand: "Bershka",
        popular:true,
        disponible:true,
    },
    {
        brand: "Calvin Klein",
        popular:true,
        disponible:true,
    },
    
    {
        brand: "Sans marques",
        popular:true,
        disponible:true,
    },
    
]

export const arraySize =[
    {
        id:1,
        subitems:[
            {
                id:2,
                subitems:[
                    {
                        size:"35",
                        plain:true,
                    },
                    {
                        size: "36",
                        plain:true,
                    },
                    {
                        size: "37",
                        plain:true,
                    },{
                        size: "38",
                        plain:true,
                    },{
                        size: "39",
                        plain:true,
                    },{
                        size: "40",
                        plain:true,
                    },{
                        size: "41",
                        plain:true,
                    },{
                        size: "42",
                        plain:true,
                    }
                    ,{
                        size: "43",
                        plain:true,
                    },{
                        size: "35.5",
                    },
                    {
                        size: "36.5",
                    },
                    {
                        size: "37.5",
                    },
                    {
                        size: "38.5",
                    },
                    {
                        size: "39.5",
                    },
                    {
                        size: "40.5",
                    },
                    
                    {
                        size: "Autres",
                    },
                ],
               
            },
            {
                id:1,
                subitems:[
                    {
                        size: "XS / 34",
                    },{
                        size: "S / 36",
                    },{
                        size: "M / 38",
                    },
                    {
                        size: "L / 40",
                    },
                    {
                        size: "Xl / 42",
                    },
                    {
                        size: "Autres",
                    }
                ]
            }
        ]
    },
    {
        id:2,
        subitems:[
            {
                id:2,
                subitems:[
                   
                    {
                        size: "36",
                        plain:true,
                    },
                    {
                        size: "37",
                        plain:true,
                    },{
                        size: "38",
                        plain:true,
                    },{
                        size: "39",
                        plain:true,
                    },{
                        size: "40",
                        plain:true,
                    },{
                        size: "41",
                        plain:true,
                    },{
                        size: "42",
                        plain:true,
                    }
                    ,{
                        size: "43",
                        plain:true,
                    },
                    {
                        size: "44",
                        plain:true,
                    },{
                        size: "45",
                        plain:true,
                    },{
                        size: "46",
                        plain:true,
                    },

                    {
                        size: "36.5",
                    },
                    {
                        size: "37.5",
                    },
                    {
                        size: "38.5",
                    },
                    {
                        size: "39.5",
                    },
                    {
                        size: "40.5",
                    },{
                        size: "41.5",
                    },{
                        size: "42.5",
                    },{
                        size: "43.5",
                    },{
                        size: "44.5",
                    },{
                        size: "45.5",
                    },{
                        size: "46.5",
                    },
                    
                    {
                        size: "Autres",
                    },
                ],
               
            },
            {
                id:1,
                subitems:[
                    {
                        size: "XS",
                    },{
                        size: "S",
                    },{
                        size: "M",
                    },
                    {
                        size: "L",
                    },
                    {
                        size: "Xl",
                    },
                    {
                        size: "Autres",
                    }
                ]
            }
        ]
    }
    
]



export const StateClothes = [
    {
        state:"Neuf avec étiquette",
        description: "Item neuf, jamais porté/utilisé avec étiquettes ou dans son emballage/boîte d'origines"
    }, {
        state:"Neuf sans étiquette",
        description: "Item neuf, jamais porté/utilisé, sans étiquettes ni emballage d'origine"
    }, {
        state:"Très bon état",
        description: "Item très peu porté/utilisé, qui peut avoir des légères imperfection mais qui reste en bon très bon état. Précise l'état en ajoutant des photos et rajoutant dans la descripition, les défauts potentiels"
    }, {
        state:" Bon état",
        description: "Item porté/utilisé quelques fois, montre les signes d'usures et d'imperfections.Précise l'état en ajoutant des photos et rajoutant dans la descripition, les défauts potentiels"
    }, {
        state:"Correct",
        description: "Item porté/utilisé souvent, montre les signes d'usures et d'imperfections. Précise l'état en ajoutant des photos et rajoutant dans la descripition, les défauts potentiels"
    },
]

export const listCategorie = (id=null, rank=null,setNavigationValue,classes,setcurrentItem,SelectableItem,setSize,mobile,setCa) =>{
         
    

  
    
    switch(rank.length){
        case 0:
            return Catalogue.map(item=>{
                return(
                    <Box width={"100%"} overflow="hidden">
                    <MenuItem  className={classes.BoxItem}
                    disableFocusRipple
                    disableTouchRipple
                    onClick={(e)=>{
                        setSize(item.number)
                        console.log(item.Name)
    
                
                        setNavigationValue([...rank, {upId:item.Name,id:0,array:item.subitems}])
    
                                     
                    }}
                    > {item.Name}
                    <IconButton className={classes.Arrow} disableFocusRipple disableRipple disableTouchRipple> <ChevronRightIcon style={{fontSize:25}} /> </IconButton>
                    </MenuItem>
                    <Divider/>
                    </Box>
                    
                )
            })
            case 1:
                return navigationCatalogue(id,rank,classes,setNavigationValue,setcurrentItem,SelectableItem,setSize,mobile)

            case 2:
                return navigationCatalogue(id,rank,classes,setNavigationValue,setcurrentItem,SelectableItem,setSize,mobile)

            case 3:
                return navigationCatalogue(id,rank,classes,setNavigationValue,setcurrentItem,SelectableItem,setSize,mobile)

            case 4:
                return navigationCatalogue(id,rank,classes,setNavigationValue,setcurrentItem,SelectableItem,setSize,mobile)
            default:
               return  0


    }

  

}



export const renderArraySize = (size,selection) =>{
    

    switch(selection){
        case "FV":
   
               return size[0].subitems[1].subitems
               
  


        case "FC":
            return (
                size[0].subitems[0].subitems
            )


        case "HV":
            return (
                size[1].subitems[1].subitems
            )

        case "HC":
            return (
                size[1].subitems[0].subitems

                )

        default:
            return size

    }
} 


export const arrayColor = [
    {
        id:"Noir",
        color:"#000000"
    },
    {
        id:"Gris",
        color:"#919191"

        
    },
    {
        id:"Beige",
        color:"#F4E0C6"

        
    },
    {
        id:"Rose",
        color:"#FF0080"

        
    },
    {
        id:"Marron",
        color:"#663300"

        
    },
    {
        id:"Violet",
        color:"#800080"

        
    },
    {
        id:"Rouge",
        color:"#E8211F"

        
    },
    {
        id:"Jaune",
        color:"#FFF200"

        
    },
    {
        id:"Bleu",
        color:"#007BC4"

        
    },
    {
        id:"Vert",
        color:"#369A3D"

        
    },
    {
        id:"Orange",
        color:"#FFA500"

        
    },
    {
        id:"Blanc",
        color:"#FFFFFF"

        
    },
    {
        id:"Kaki",
        color:"#7E805D"

        
    },
    {
        id:"Turquoise",
        color:"#40E0D0"

        
    },
    {
        id:"Bordeaux",
        color:"#6D071A"

        
    },
    {
        id:"Bleu clair",
        color:"#77B5FE"

        
    },
    {
        id:"Vert foncé",
        color:"#095228"

        
    },
   
]




