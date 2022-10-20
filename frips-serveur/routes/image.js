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


const multer = require("multer")
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(req.body.id[0])
        let path = `public/images/${req.body.id[0]}`;

        fs.mkdirsSync(path);

        cb(null,path)
    },
    filename:(req,file,cb)=>{
        
        let id = nanoid()
    /* need to use the file's mimetype because the file name may not have an extension at all */

        cb(null,`${id}`+ path.extname(file.originalname))
    }
})
const upload = multer({storage:fileStorage})




const {PrismaClient} =  require("@prisma/client")
const {image} = new PrismaClient()
const sharp = require("sharp")



// @route   Post api/items
// @desc    post one item
// @acces    Private



router.post("/",auth,upload.array("upload",10),async (req,res)=>{

    
    
    try {
        for (let index = 0; index < req.files.length; index++) {
            

            await image.create({
                data:{
                    id_Item:parseInt(req.body.id),
                    image:req.files[index].path.split("\\")[3],
                }
            })

            
        }


        res.status(200).json("succès")

     


    } catch (error) {
        console.log(error)
        res.status(500).json("Server error")
    }

})




module.exports = router;