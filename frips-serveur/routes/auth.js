const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check,validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")

const {PrismaClient} =  require("@prisma/client")

const {account} = new PrismaClient()

// @route   GET api/auth
// @desc    Auth route
// @acces    Public



router.get("/",auth,async(req,res)=>{
           
            try {
                const user = await account.findUnique({
                    where:{
                        id:req.user.id
                    },
                    select:{
                        Pseudo:true,
                        Email:true,
                        id:true

                    }
                })
                res.json(user)
                
            } catch (error) {
                console.log(error)
                res.status(500).send("Serveur error")
            }


    
})




// @route   POST api/auth
// @desc    Auth user & get token
// @acces    Public



router.post("/",async (req,res)=>{
    console.log("ok")
    const {Email,Password} = req.body;
    console.log(req.body)
    try {
        let user = await account.findUnique({
            where:{
                Email
            },
            select:{
                Password:true,
                id:true,
            }
        })

        
        

        if(!user){

            res
            .status(400)
            .json({errors:[{msg:"Identifiant invalide"}]})

        }


        

        const isMatch = await bcrypt.compare(Password,user.Password)


        if(!isMatch){
            res
            .status(400)
            .json({errors:[{msg:"Identifiant invalide"}]})
        }
        //webtokken

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get("jwtSecret"),
        {expiresIn:360000},
        (err,token)=>{
            if (err) throw err;
            res.json({token})
        }
        )

        // avatar*/
      
        
    } catch (error) {
        console.log(error)

        res.status(500).send("Server error")
        
    }



})

// @route   GET api/auth/moderator
// @desc    Auth route
// @acces    Public



router.get("/moderator",auth,async(req,res)=>{

      try {
          const user = await moderator.findUnique({
              where:{
                  id:req.user.id
              },
              select:{
                  Pseudo:true,
                  Email:true,
                  id:true

              }
          })
          res.json(user)
          
    } catch (error) {
        console.log(error)
        res.status(500).send("Serveur error")
    }

})

// @route   POST api/auth/moderator
// @desc    Auth moderator & get token
// @acces    Public

router.post("/moderator",async (req,res)=>{
    console.log("ok")
    const {Email,Password} = req.body;
    console.log(req.body)
    try {
        let user = await moderator.findUnique({
            where:{
                Email
            },
            select:{
                Password:true,
                id:true,
            }
        })       
        

        if(!user){

            res
            .status(400)
            .json({errors:[{msg:"Identifiant invalide"}]})

        }

        const isMatch = await bcrypt.compare(Password,user.Password)


        if(!isMatch){
            res
            .status(400)
            .json({errors:[{msg:"Identifiant invalide"}]})
        }
        //webtokken

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get("jwtSecret"),
        {expiresIn:360000},
        (err,token)=>{
            if (err) throw err;
            res.json({token})
        }
        )

        // avatar*/
      
        
    } catch (error) {
        console.log(error)

        res.status(500).send("Server error")
        
    }

})

module.exports = router;