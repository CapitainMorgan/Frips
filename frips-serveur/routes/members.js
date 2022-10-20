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

const {item,account,image,message} = new PrismaClient()






// @route   GET api/members/myFrips
// @desc    get all your post
// @acces    Private



router.get("/members",auth,async(req,res)=>{
    const {id} = req.user.
    
    console.log(id)
    const MyFrips = await item.findMany({
        where:{
            id_Seller:id
        },
        include:{
            account_item:true
        }
        
    })

    console.log(MyFrips)
    


    res.status(200).json(MyFrips)
})

// @route   get api/members/myFrips
// @desc    get all your post
// @acces    Private



router.get("/myFrips",auth,async(req,res)=>{
    const {id} = req.user
    console.log(id)
    const MyFrips = await item.findMany({
        where:{
            id_Seller:id
        },
        include:{
            image:{
                take:1
            }
        }
        
    })



    



    res.status(200).json(MyFrips)
})



// @route   get api/members/myFrips
// @desc    get all your post
// @acces    Private



module.exports = router;