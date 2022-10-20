import {Box ,makeStyles, Typography,Button, Avatar } from '@material-ui/core'
import React,{useState} from 'react'

import moment from "moment"
import 'moment/locale/fr' 
import 'moment/locale/de'
import ProposeMessage from './ProposeMessage'
import { useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({

    MenuSetting:{
        height:30,
        width:"100%",
        display:"flex",
        position:"relative",
    },
    boxShadow:{
        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white",
        width:"80%",
        display:"flex",
        flexDirection:"column",
        padding:30,
        margin:"auto",
        position:"relative"
    },
    MessageBoxLeft:{
        display:"flex",
        justifyContent:"flex-end",
        position:"relative",
        
    },
    MessageBoxRight:{
        display:"flex",
        justifyContent:"flex-start",
        position:"relative",
        padding:5,
        alignItems:"center"
       
    },
    Message:{
        padding: 10,
        display:"flex",
        flexDirection:"column",
        wordWrap:"break-word",
    borderRadius: 5,
    color: "black",
    maxWidth:400,
    minWidth:350,
    wordBreak:"break-word",
    hyphens:"auto",
    [theme.breakpoints.down('sm')]: {
        
        minWidth:"50%",
        
        

      
    }
   
    
    
    

},

   

  }));


const Message = ({own,Text,hours,item,id_Sender,userId,image}) => {
    

    const classes = useStyles()
    if(own){
        if(item){
            return(
                <div className={classes.MessageBoxLeft}   >

                <Box padding={2} paddingTop={1} paddingBottom={1} position="relative" display="flex" flexDirection="column" >

                    <Box className={classes.Message} style={{backgroundColor:"#82A0C2"}} display="flex" position="relative" alignItems="center" justifyContent="center">
                        
                        <ProposeMessage />
                        <Box className={classes.MessageBoxRight} style={{wordWrap:"break-word",wordBreak:"break-word",hyphens:"auto",width:"100%"}}    >
                        <Box height={150} width={150}>
                            <img alt={`/images/${item.id}/${item.image[0].image}`} src={`/images/${item.id}/${item.image[0].image}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />

                            </Box>
                            <Box flexGrow={1} display={"flex"} flexDirection="column" >
                                <Box padding={2} display="flex" flexGrow={1}>
                                    <Typography style={{fontSize:16}}>
                                        Prix de base : 
                                    </Typography>
                                    <Typography style={{fontSize:16}}>
                                       {item.Price} CHF
                                    </Typography>
                                </Box>

                                <Box padding={2} display="flex" flexGrow={1}>
                                <Typography style={{fontSize:16}}>
                                Offre   :  
                                    </Typography>
                                    <Typography style={{fontSize:16,fontWeight:600}}>
                                    </Typography>
                                </Box>
                                
                            </Box>
                            
                        </Box>
                        {userId !== id_Sender ? <Box padding={2} width="100%" display={"flex"}>
                                   <div style={{flexGrow:1,padding:5}} >
                                   <Button style={{backgroundColor:"white",width:"100%"}} >Accepeter</Button>
                                   </div>
                                   <div style={{flexGrow:1,padding:5}} >
                                   <Button style={{backgroundColor:"white",width:"100%"}} >Refuser</Button>
                                   </div>

                        </Box>:   
                        <div style={{flexGrow:1,padding:5}} >
                            <Typography style={{fontSize:16}}>
                                Votre offre est en Attente
                            </Typography>
                        </div>
                         }
                        
                        <Box className={classes.MessageBoxLeft} width="100%" padding={0.2}>
                            <Typography style={{fontSize:12}}>
    
                                        { moment(hours).local().fromNow() ==="il y a quelques secondes" ? moment(hours).local().fromNow() : moment(hours).local().format("LT")  }
    
    
                            </Typography>
                        </Box>
                    </Box>
                
                </Box>
                
            </div>
            )
        }
        else{
            return(
                <div className={classes.MessageBoxLeft}   >
                <Box padding={2} paddingTop={1} paddingBottom={1} position="relative" display="flex" flexDirection="column" >
                    <Box className={classes.Message} style={{backgroundColor:"#82A0C2"}} display="flex" position="relative" alignItems="center" justifyContent="center">
                        <Box className={classes.MessageBoxRight} style={{wordWrap:"break-word",wordBreak:"break-word",hyphens:"auto",width:"100%"}}    >
                            
                            
                            <Typography style={{fontSize:16}}>
                                {Text}
                            </Typography>
                        </Box>
                        <Box className={classes.MessageBoxLeft} width="100%" padding={0.2}>
                            <Typography style={{fontSize:12}}>
    
                                        { moment(hours).local().fromNow() ==="il y a quelques secondes" ? moment(hours).local().fromNow() : moment(hours).local().format("LT")  }
    
    
                            </Typography>
                        </Box>
                    </Box>
                
                </Box>
                
            </div>
            )
        }
    }
    else{
        if(item){
            return (
                <div className={classes.MessageBoxRight} >
                <Box paddingTop={1} paddingBottom={1} >
                <Box className={classes.Message} style={{backgroundColor:"#F5f3f3"}} display="flex" position="relative" alignItems="center" justifyContent="center">
                        
                        <ProposeMessage />

                        <Box className={classes.MessageBoxRight} style={{wordWrap:"break-word",wordBreak:"break-word",hyphens:"auto",width:"100%"}}    >
                        <Box height={150} width={150}>
                            <img alt={`/images/${item.id}/${item.image[0].image}`} src={`/images/${item.id}/${item.image[0].image}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />

                            </Box>
                            <Box flexGrow={1} display={"flex"} flexDirection="column" >
                                <Box padding={2} display="flex" flexGrow={1}>
                                    <Typography style={{fontSize:16}}>
                                        Prix de base : 
                                    </Typography>
                                    <Typography style={{fontSize:16}}>
                                       {item.Price} CHF
                                    </Typography>
                                </Box>

                                <Box padding={2} display="flex" flexGrow={1}>
                                <Typography style={{fontSize:16}}>
                                Offre   :  
                                    </Typography>
                                    <Typography style={{fontSize:16,fontWeight:600}}>
                                    </Typography>
                                </Box>
                                
                            </Box>
                        </Box>

                        <Box padding={2} width="100%" display={"flex"}>
                                   <div style={{flexGrow:1,padding:5}} >
                                   <Button style={{backgroundColor:"white",width:"100%"}} >Accepeter</Button>
                                   </div>
                                   <div style={{flexGrow:1,padding:5}} >
                                   <Button style={{backgroundColor:"white",width:"100%"}} >Refuser</Button>
                                   </div>

                                </Box>
                        <Box className={classes.MessageBoxRight} width="100%" padding={0.2}>
                            <Typography style={{fontSize:12}}>

                                        { moment(hours).local().fromNow() ==="il y a quelques secondes" ? moment(hours).local().fromNow() : moment(hours).local().format("LT")  }
    
    
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </div>
            )
        }
        else{
            return (
                <div className={classes.MessageBoxRight} >
                <Avatar src={`/imageProfile/${image.ProfileNumber}/${image.imageProfile}`} style={{marginRight:10}}   />

                <Box paddingTop={1} paddingBottom={1} >
                <Box className={classes.Message} style={{backgroundColor:"#F5f3f3",border:"solid 1px",borderRadius:4,borderColor:"#F5f3f3"}} display="flex" position="relative" alignItems="center" justifyContent="center" >
                        <Box className={classes.MessageBoxRight} style={{wordWrap:"break-word",wordBreak:"break-word",hyphens:"auto",width:"100%"}}    >
                            <Typography style={{fontSize:16}}>
                                {Text}
                            </Typography>
                        </Box>
                        <Box className={classes.MessageBoxRight} width="100%" padding={0.2}>
                            <Typography style={{fontSize:12}}>
    
                                        { moment(hours).local().fromNow() ==="il y a quelques secondes" ? moment(hours).local().fromNow() : moment(hours).local().format("LT")  }
    
    
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </div>
            )
        }
    }
}

export default Message
