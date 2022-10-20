const jwt = require("jsonwebtoken")
const config = require("config")




module.exports = (req,res,next) =>{
    
   
    //get token from header
    const token = req.header("x-auth-token")
    //check if not token
    if(!token){
        return res.status(401).json({msg:"Pas de token authoristation refusé"})
    }

    try {
        const decoded = jwt.verify(token,config.get("jwtSecret"))
        req.user = decoded.user

        console.log(req.user.id)


        next()
        
    } catch (error) {
        res.status(401).json({msg:"token invalide"})
    }

}