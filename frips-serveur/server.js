

const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");
const path = require('path');
const http = require("http")
const cors = require("cors")
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin : "http://localhost:3000",


    },
  forceNew: true,
  upgrade: false,
  rejectUnauthorized: false
})
const {PrismaClient} =  require("@prisma/client");

const prisma = new PrismaClient()





app.use(cors())
app.use(express.json({extended:false}))

app.use(express.static('public'))

app.get("/", async (req,res)=>{

    res.send("API IS RUNNING")
    }    

)









app.use("/api/user",require("./routes/user"))
app.use("/api/auth",require("./routes/auth"))
app.use("/api/images",require("./routes/image"))
app.use("/api/items",require("./routes/items"))
app.use("/api/members",require("./routes/members"))
app.use("/api/conversation",require("./routes/conversation"))
app.use("/api/edit",require("./routes/edit"))
app.use("/api/infoItem",require("./routes/infoItem"))
app.use("/api/create-payment-intent",require("./routes/payment"))



io.on("connection", (socket) =>{

    socket.on("setup", ({userId})=>{
        console.log(userId,"setup")
        socket.join(userId)
        socket.emit("connected")
    })

    console.log("A User connected to socket io")
    socket.on("join room", room =>{
        console.log(room,"ok")
        socket.join(room)
    })


    
    socket.on("new message",(newMessage)=>{
        const chat = newMessage.Profile
        console.log(newMessage,"newMessage")
        
        if(chat.length===0 || chat.length <1){
            return console.log("Chat users not defined")
        }
        
        chat.map(item =>{
             if(item== newMessage.id_Sender){
                    return ;
                }
                socket.in(newMessage.id).emit("message received",{
                    id_Sender:   newMessage.id_Sender,
                    id_Receiver: newMessage.id_Receiver,
                    id_Chat:     newMessage.id,
                    Date_Houre:  newMessage.date,
                    Text: newMessage.Message.text,
                    id_Item: newMessage?.id_Item ? newMessage?.id_Item : null,
                    item: newMessage?.item ? item : null
                })
 
        })
    })
    socket.on("disconnect", ()=>{
        console.log("User disconnect")
    })
})



server.listen(PORT)