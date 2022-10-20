const express = require("express")
const router = express.Router()
const { nanoid } = require('nanoid')

const path = require('path'); // path for cut the file extension
let fs = require('fs-extra');

const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check,validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const {PrismaClient} =  require("@prisma/client")

const {item,account,image,message,brand,color,category,itemcondition,category_category} = new PrismaClient()




// @route   GET api/members/myFrips
// @desc    get all your post
// @acces    Private





router.get("/info",async(req,res)=>{

    console.log("launch")

    

    try {
        
        const infoBrand = await brand.findMany({
            select:{
               Name:true,
               id:true,
            },
            orderBy:{
                id:"asc"
            }
        })
        const infoColor = await color.findMany({
            select:{
               Code:true,
               Name:true,
               id:true,

            },
            orderBy:{
                id:"asc"
            }
        })
        const infoItemCondition = await itemcondition.findMany({
            select:{
               Description:true,
               Name:true,
               id:true

            },
            orderBy:{
                id:"asc"
            }
        })

        const infoCategory = await category.findMany({
            select:{
                Name:true,
                id:true,
                
            }
        })

        console.log(infoCategory[0])

        const infoObject = {
            brandInfo:infoBrand,
            itemconditionInfo:infoItemCondition,
            itemColorInfo:infoColor,
            infoCategory

        }


        res.status(200).json(infoObject)
        
    } catch (error) {
        res.status(500).json("Server error")

    }
})



module.exports = router
