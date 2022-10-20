const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check,validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const multer = require("multer")

const {PrismaClient} =  require("@prisma/client")

const {item,account,image,favorit,color,brand,} = new PrismaClient()

// @route   Post api/items
// @desc    post one item
// @acces    Private

const brandChecking = async (BrandName) =>{

    
   
        
        const exist =await brand.upsert({
            where:{
                Name:BrandName
            },
            create:{
                Name:BrandName
            },
            update:{}

        })    
    
       return exist.id
    

}

router.post("/",auth,async (req,res)=>{

        
    const {formValues,id} =  req.body
    const Name = formValues.Titre
    const [firstColor,SecondColor] = formValues.Color
    const Size = formValues.Size
    const DatePuplication = await new Date()
    const Description = formValues.Description
    const Price = parseFloat(formValues.Price)
    const CurrentAuction = true
    const State = formValues.State
    const Brand = formValues.Brand
    
    console.log(Brand)


    try {
        const exist = await brand.upsert({
            where:{
                Name:Brand
            },
            create:{
                Name:Brand
            },
            update:{}

        }) 
        
        console.log(exist)
        const Item = await item.create({
           
            data:{
                Name,
                Description,
                Size,
                Price,
                DatePuplication,
                id_Seller:id.id,
                CurrentAuction,
                item_color:{
                    createMany:{
                        data:[
                            {id_Color:firstColor.id},
                            {id_Color:SecondColor.id}
                        ]
                    }
                },
                id_ItemCondition:State,
                item_brand:{
                    create:{
                        id_Brand:exist.id,
                        
                        
                        
                        

                    }
                },
                

                

                
                
            
               
               
               
            }
        })
        

        
        

        res.status(200).json(Item)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})

// @route   Post api/items
// @desc    post one item
// @acces    Private



router.get("/",async (req,res)=>{
    
    
    
    try {
        
        const Item = await item.findMany({
            include:{
                image:{
                    take:1
                },
                item_brand:{
                    select:{
                        brand:{
                            select:{
                                Name:true
                            }
                        }
                    }
                }

                ,
                _count:{
                    select:{
                        favorit:true
                    }
                },
                account:{
                    select:{
                        Pseudo:true
                    }
                },
               
                
            },
            take:-10,
            

           
            
            
            
        })



        





        

        

        

        res.status(200).json(Item)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})


router.post("/ItemForPorpose",async (req,res)=>{

    console.log(req.body,"propose")
    const {id} = req.body
    
    console.log(req.body,id)
    try {
        
        const Item = await item.findMany({
            where:{
                account:{
                    id:id
                }
            },
            include:{
                image:{
                    take:1
                },
                item_brand:{
                    select:{
                        brand:true
                    }
                }

                ,
                _count:{
                    select:{
                        favorit:true
                    }
                },
                account:{
                    select:{
                        Pseudo:true
                    }
                },
               
                
            },
            take:-10,
            

           
            
            
            
        })

        

        


        





        

        

        

        res.status(200).json(Item)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})

router.get("/auth",auth,async (req,res)=>{
    
    
    
    try {
        
        const Item = await item.findMany({
            include:{
                image:{
                    take:1
                },
                item_brand:{
                    select:{
                        brand:true
                    }
                }

                ,
                _count:{
                    select:{
                        favorit:true
                    }
                },
                account:{
                    select:{
                        Pseudo:true
                    }
                },
                favorit:{
                    where:{
                        id_Account:{
                            equals:req.user.id
                        }
                    }
                }
                
               
                
            },

            take:-10
            


           
            
            
            
        })

        console.log(Item[0].favorit)




        res.status(200).json(Item)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})

router.get("/filterCataloguePagination",async (req,res)=>{
    
    
    
    try {
        
        const Item = await item.findMany({
            include:{
                image:{
                    take:1
                },
                item_brand:{
                    select:{
                        brand:true
                    }
                }

                ,
                _count:{
                    select:{
                        favorit:true
                    }
                },
                account:{
                    select:{
                        Pseudo:true
                    }
                },
                
                
               
                
            },

            take:-20
                 
        })
     

        res.status(200).json(Item)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})

router.post("/more",async (req,res)=>{
    
    const {number} = req.body

    console.log("post here")
    try {
        
        const Item = await item.findMany({
            include:{
                image:{
                    take:1
                },
                item_brand:{
                    select:{
                        brand:true
                    }
                }

                ,
                _count:{
                    select:{
                        favorit:true
                    }
                },
                account:{
                    select:{
                        Pseudo:true
                    }
                },
                              
            },
            orderBy:{
                DatePuplication:"desc"
            },
            take:10,
            skip:10*number        
        })
        res.status(200).json(Item)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})




router.get("/new",async (req,res)=>{
    
    
    
    try {
        
        const Item = await item.findMany({
            include:{
                image:{
                    take:1
                },
                item_brand:{
                    select:{
                        brand:true
                    }
                }

                ,
                _count:{
                    select:{
                        favorit:true
                    }
                },
                account:{
                    select:{
                        Pseudo:true
                    }
                },
                
                
            },

            take:-5
            


           
            
            
            
        })




        





        

        

        

        res.status(200).json(Item)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})



router.get("/Id_of_MyFavorite",auth,async (req,res)=>{
    
    
    
    try {
        
        

        const [favorit] = await account.findMany({
            where:{
                id:req.user.id
            },
            select:{
                favorit:{
                    select:{
                        id_Item:true
                    }
                }
            }
        })
        console.log(favorit)

        //[longeur 100]
        // items favorit true

        // longeur 20
        // 
        
        // Items retourné //id // 
        // favorit id //
        





        

        

        

        res.status(200).json(favorit)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})

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



router.get("/:id",async (req,res)=>{
    const {id} = req.params
    try {
        
       
        let Item = await item.findUnique({
            where:{
                id:parseInt(id)
            },
            
            select:{
                image:true,
                account:{
                    select:{
                        Pseudo:true,
                        item:{
                            take:12,
                            include:{
                                item_brand:{
                                    select:{
                                        brand:{
                                            select:{
                                                Name:true
                                            }
                                        }
                                    }
                                },
                                image:{
                                    take:1
                                },

                                
                                
                            },

                        

                        }
                    }
                },
                Description:true,
                Price:true,
                Size:true,
                item_brand:{
                    select:{
                        brand:{
                            select:{
                                Name:true,
                                id:true,

                            }
                        }
                    },
                },
                item_color:{
                    select:{
                        color:{
                            select:{
                                Name:true
                            }
                        }
                    }
                },
                itemcondition:{
                    select:{
                        Name:true
                    }
                },
                id:true
               


            },
            
            

        })
        /*Name:Item.item_brand[0].brand.Name,
        NOT:{
            id:Item.item_brand[0].brand.id
        }*/

        let similarProduct = await item.findMany({
         where:{
             
            OR:[
                {
                    item_color:{
                    some:{
                       OR:[
                           {color:{
                               Name:Item.item_color[0].color.Name
                           }},
                           {color:{
                               Name:Item.item_color[0].color.Name
                           }},
                           
                           
                       ] 
                    }
                

                }}
            ]
         } ,
         take:12  
        })

        if(similarProduct){
            Item = {
                ...Item,
                similarProduct
            }
            res.status(200).json(Item)

        }

        console.log(Item)

       
        





    
        


      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})

router.post("/favorit",auth,async (req,res)=>{

    
    
  
    try {
        
       const exist = await favorit.findUnique({
            where:{
                id_Account_id_Item:{
                    id_Item:req.body.id,
                    id_Account:req.user.id
                },
                
            },
            select:{
                item:true
            }
        })

        if(exist){
            await favorit.delete({
                where:{
                    id_Account_id_Item:{
                        id_Item:req.body.id,
                        id_Account:req.user.id
                    },
                    
                }
            })
            res.status(200).json("upload")
        }

       
        else{
            await favorit.create({
                data:{
                    id_Account:req.user.id,
                    id_Item:req.body.id
                }
            })
            res.status(200).json("ok")
        }

        

       

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})


router.get("/favorit/all",auth,async (req,res)=>{

    
  
    try {
        
        

       
        const myFavorite = await account.findUnique({
            where:{
                id:parseInt(req.user.id)
            },
            select:{
                favorit:{
                    include:{
                        item:{
                            select:{
                                image:{
                                    take:1
                                },
                                Description:true,
                                Price:true,
                                Size:true,
                                id:true,
                            }
                        },
                        
                    },
                    
                }
            },
            
        })


        

        res.status(200).json(myFavorite)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})



module.exports = router;