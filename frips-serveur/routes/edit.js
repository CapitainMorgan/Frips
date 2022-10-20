
const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check,validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const multer = require("multer")
const upload = multer()
const fs = require("fs");
const {PrismaClient} =  require("@prisma/client")

const {item,account,image,favorit} = new PrismaClient()

router.get("/:idItem",auth,async (req,res)=>{
    const {idItem} = req.params
    console.log(idItem,"id")
    try {
        
       
        const {item} = await account.findUnique({
            where:{
                id:req.user.id,
            
            },
            select:{
             item:{
                where:{
                    id:parseInt(idItem)
                    
                    
                },
                include:{
                    image:{
                        select:{
                            image:true
                        }
                    }
                    
                }
            }
              
            }
            
            
        })






    
        

        res.status(200).json(item)

      
    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})

module.exports = router;