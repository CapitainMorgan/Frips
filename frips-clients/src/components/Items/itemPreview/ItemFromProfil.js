import { Avatar, Box,Card,CardActions,CardActionArea, CardHeader, CardMedia, Button, makeStyles,IconButton, CardContent, Typography, Divider } from "@material-ui/core"
import Favorite from "@material-ui/icons/Favorite"
import React from "react"

const images = ["https://loremflickr.com/800/800?random=1","https://loremflickr.com/800/800?random=2","https://loremflickr.com/800/800?random=3",
"https://loremflickr.com/800/800?random=4",
"https://loremflickr.com/800/800?random=5",
"https://loremflickr.com/800/800?random=6",
"https://loremflickr.com/800/800?random=7",

]

const useStyles = makeStyles((theme) => ({
    
    floatContentInfomrationdiv:{
        width:"25%",
        height:565,
       
        
        
       
        
    },
    BoxOneItem:{
        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white",
        padding:2,
        width:"100%",
        height:"100%"
    },
    GridSytem:{
        display:"grid",
        gridTemplateColumns:"repeat(4,25%)",
        width:"100%",
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns:"repeat(2,50%)"
           
           
            
    
          },

    },
    

  }));


const OneItemProfil = ({number}) =>{
    const classes = useStyles()
    return(
        <Box width={"100%"} height={"10vh%"} padding={1} >
                <Card className={classes.BoxOneItem}> 
                    <CardHeader
                    avatar={
                        <IconButton>
                            <Avatar>
                                S
                            </Avatar>
                        </IconButton>
                    }
                    title="Stefan"
                    
                    />
                        <Box  >
                        <CardActionArea style={{width:"100%",height:"100%"}}>
                        <img src={images[number]} style={{width:"100%",height:"100%",objectFit:"cover"}} />

                        </CardActionArea>
                        </Box>
                        <Box padding={2}>
                            <Typography>
                            15 CHF
                            </Typography>
                            <Typography>
                            Nike
                            </Typography>
                            <Typography>
                            Taille Xl
                            </Typography>
                        </Box>
                        <Divider/>
                        <Box height={44} display="flex" alignItems="center" >
                            <IconButton><Favorite></Favorite></IconButton>
                            <Typography>5</Typography>
                        </Box>


                </Card>
                
            </Box>
    )

}

const ItemProfil = ({state}) =>{
    
    const classes = useStyles()
    return (
        <Box className={classes.GridSytem}  >
            <OneItemProfil number={0}/>
            <OneItemProfil number={1}/>

            <OneItemProfil number={2}/>

            <OneItemProfil number={3}/>

            <OneItemProfil number={4}/>

            
        </Box>
    )
}

export default ItemProfil;