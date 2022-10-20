const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {PrismaClient} =  require("@prisma/client")

const {account,item,chat,message,pricepropose} = new PrismaClient()

router.post("/",auth,async(req,res)=>{
    let id_item = parseInt(req.body.id)
    const {id} = req.user
    
    try {
        const id_Receiver = await item.findUnique({
            where:{
                id:parseInt(id_item),
                
            },
            select:{
                account:{
                    select:{
                        Pseudo:true,
                        id:true
                    },
                    
                }
            }
            
        })




        let existConv = await chat.findMany({
            where:{
                OR:[
                    {
                        
                        id_Account_1:id,
                id_Account_2:id_Receiver.account.id
                    },
                    {
                        id_Account_2:id,
                id_Account_1:id_Receiver.account.id
                    }
                ]
            },
        
            
                select:{
                    id:true,
                    message:true,
                    account_accountTochat_id_Account_2:{
                        select:{
                            Pseudo:true,
                            id:true,
                            
                        }
                    },
                    account_accountTochat_id_Account_1:{
                     select:{
                         Pseudo:true,
                         id:true
     
                     }
                    }
                }
                
            
            
            
        })

        console.log(existConv)


        if(existConv.length !==0){
           const test = {
                Profile:[existConv[0].account_accountTochat_id_Account_1.id,existConv[0].account_accountTochat_id_Account_1.Pseudo],
                Profile1:[existConv[0].account_accountTochat_id_Account_2.id,existConv[0].account_accountTochat_id_Account_2.Pseudo],
                message:existConv[0].message,
                id:existConv[0].id
            }
            res.status(200).json(test)

        }
        

        
        let create;
        if(existConv.length===0 || existConv === undefined){
            create= await chat.create({
                data:{
                    id_Account_1:id,
                    id_Account_2:id_Receiver.account.id
                },
                select:{
                    message:true,
                    id:true,
                    account_accountTochat_id_Account_2:{
                        select:{
                            Pseudo:true,
                            id:true
                        }
                    },
                    account_accountTochat_id_Account_1:{
                     select:{
                         Pseudo:true,
                         id:true
     
                     }
                    }
                }
                
                
            })

           const test = {
                Profile:[create.account_accountTochat_id_Account_1.id,create.account_accountTochat_id_Account_1.Pseudo],
                Profile1:[create.account_accountTochat_id_Account_2.id,create.account_accountTochat_id_Account_2.Pseudo],
                message:create.message,
                id:create.id
            }


            res.status(200).json(test)
        }





       




    } catch (error) {
        console.log(error)
        res.status(500).send("Serveur error") 
    }




})


router.post("/myConversation/newMessage",auth,async(req,res)=>{
    const id_Chat = req.body.chat_id
    const text = req.body.Text
    const {id} = req.user
    const {id_Item} = req.body
    const PricePropose = req.body.Price


    console.log(req.body,text,"ici")


    




    console.log(PricePropose,id_Item)
    
    
    try {
        if(id_Item && PricePropose){
            await pricepropose.create({
                data:{
                    id_Item:id_Item,
                     id_Account:id,
                     Price:parseFloat(PricePropose),
                     dateApprove:null,
                     Approve:false
                }
            })
        }
       const newMessage = await message.create({
           data:{
               id_Chat:parseInt(id_Chat),
               Text:text,
               Date_Houre: new Date(),
               id_Sender:id,
               id_Receiver:req.body.id_Receiver,
               id_Item: id_Item
               
               
               
           }
       })

       res.status(200).json("message send")
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Serveur error")
    }

    


})

router.get("/MyConversation/lastMessage/:id",auth,async(req,res)=>{
    const {id} =parseInt(req.params)


    console.log("MyConversation/lastMessage")

    
    try {
       const conv = await chat.findUnique({
           where:{
               id:parseInt(id)
           },
           select:{
               message:{
                   take:-1
               }
            
           }
       })

       const test = {
           message:conv.message[0]
       }





       res.status(200).json(test)
    } catch (error) {
        console.log(error)
        res.status(500).send("Serveur error")
    }

    


})

router.get("/MyConversation/:id",auth,async(req,res)=>{
    const {id} = req.params

    console.log("MyConversation/:id")
    
    try {
       const conv = await chat.findUnique({
           where:{
               id:parseInt(id)
           },
           select:{
               message:{
                   take:-20,
                   include:{
                       item:{
                           select:{
                               image:{
                                   take:1,

                               },
                               Price:true,
                               id:true,
                               pricepropose:{
                                   select:{
                                       Price:true,
                                       id_Account:true
                                   }
                               }

                           }
                       }
                   }
               },
               account_accountTochat_id_Account_2:{
                   select:{
                       Pseudo:true,
                       id:true
                   }
               },
               account_accountTochat_id_Account_1:{
                select:{
                    Pseudo:true,
                    id:true

                }
            }
           }
       })

       const test = {
           Profile:[conv.account_accountTochat_id_Account_1.id,conv.account_accountTochat_id_Account_1.Pseudo],
           Profile1:[conv.account_accountTochat_id_Account_2.id,conv.account_accountTochat_id_Account_2.Pseudo],
           message:conv.message.reverse()
       }




       res.status(200).json(test)
    } catch (error) {
        console.log(error)
        res.status(500).send("Serveur error")
    }

    


})
router.post("/MyConversation/:id",auth,async(req,res)=>{
    const {id} = req.params
    const {number} = req.body
    try {

        const maxValue = await message.count({
            where:{
                id_Chat:parseInt(id)
            }
        })
       const conv = await chat.findUnique({
           where:{
               id:parseInt(id)
           },
           select:{
               
               message:{
                   orderBy:{
                       Date_Hour:"desc"
                   },
                   take:20,
                   skip:20*number,
                   include:{
                       item:{
                           select:{
                               image:{
                                   take:1,


                               },
                               Price:true,
                               Size:true,
                           }
                       }
                   }
                   
                   
               }
           }
       })

      

      

       const test = {
           message:conv.message
       }

       console.log(test)







       res.status(200).json(test)
    } catch (error) {
        console.log(error)
        res.status(500).send("Serveur error")
    }

    


})




router.get("/myConversation",auth,async(req,res)=>{
    const {id} = req.user


  
    try {
        
        let myConversation = await chat.findMany({
            where:{
                OR:[
                    {
                        id_Account_1:id,
                        message:{
                            every:{
                                OR:[
                                    {Text:{
                                        not:""
                                    }
                                },
                                {id_Item:{  not:null}}
                                ]
                                
                            }
                         }
                 },
                 {
                     id_Account_2:id,
                     message:{
                        every:{
                            OR:[
                                {Text:{
                                    not:""
                                }
                            },
                            {id_Item:{  not:null}}
                            ]
                            
                        }
                     }
                     
                 },
                 
                 

                ],
               
            },
            
            select:{
                message:{
                   
                    take:-1,
                    
                   
                   

                   
                                      
                   
                    
              },
              
              

                account_accountTochat_id_Account_2:{
                    select:{
                        Pseudo:true
                    }

                },
                account_accountTochat_id_Account_1:{
                    select:{
                        Pseudo:true
                    }

                },
                

                
                
            }
        })

        console.log(myConversation)

        //
        
       const a = myConversation.sort((a,b)=>{
           console.log(a.message[0].Date_Houre.getTime(),b.message[0].Date_Houre.getTime())
            return b.message[0].Date_Houre.getTime() - a.message[0].Date_Houre.getTime()
        })

        console.log(a)

       res.status(200).json(a)
    } catch (error) {
        console.log(error)
        res.status(500).send("Serveur error")
    }

    


})



module.exports = router;
