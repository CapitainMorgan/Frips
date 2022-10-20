import React from 'react'
import { Box, Typography,CardHeader,Card,Avatar,IconButton,CardActionArea,Divider ,makeStyles} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
const images = ["http://lorempixel.com/800/800/nature","http://lorempixel.com/800/800/nature/2","http://placekitten.com/800/800"];



const useStyles = makeStyles((theme) => ({

    boxShadow:{

        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white",
        
    },GridSystem:{
        display:"grid",
        gridTemplateColumns:"repeat(5,20%)",
        [theme.breakpoints.down('sm')]: {
            width:"100%",
            display:"grid",
            padding:20,
            gridTemplateColumns:"repeat(1,100%)"
           
           
            
    
          },

    },
    floatContentArticle: {
        display:"flex",
        flexDirection:"column",
        width:1000,
        margin:"auto",
        
        
        
        [theme.breakpoints.down('sm')]: {
          width:"100%",
          padding:0,
          display:"block"
        }
      },
  }));

const renderedItem = (classes) =>{
    
    return images.map((item,index) =>{
   
   
        return(
            <Box width={"100%"} height={"100%"} padding={1} position="relative">
            <Card className={classes.boxShadow}> 
                <CardHeader
                avatar={
                    <IconButton>
                        <Avatar>
                            S
                        </Avatar>
                    </IconButton>
                }
                titleTypographyProps={{
                    style:{fontSize:15}
                }}
                title="Stefan"
                
                
                />
                    <Box  display="flex" position="relative">
                    <CardActionArea style={{width:"100%",height:"100%"}}>
                    <img src={images[index]} style={{width:"100%",height:"100%",objectFit:"cover"}} />

                    </CardActionArea>
                    </Box>
                    <Box padding={2}>
                        <Typography style={{fontSize:16,fontWeight:600}}>
                       1 CHF
                        </Typography>
                        <Typography>
                        1 CHF
                        </Typography>
                        <Typography>
                        1 CHF
                        </Typography>
                    </Box>
                    <Box position="absolute" bottom={20} right={15} display="flex" alignItems="center">
                        <Typography style={{fontSize:16}}>
                            Modifier
                        </Typography>
                        <IconButton> <EditIcon/> </IconButton>
                    </Box>
                    

            </Card>
            
        </Box>
        )
    })
}

const FavoriteItem = () => {
    const classes = useStyles()
    return (
        <Box width={"100%"} height={"100%"}  style={{backgroundColor:"#F5f5f3"}}>
            <Box height={"15vh"}/>
            <Box className={classes.floatContentArticle}>
                <Box margin="auto" padding={3}>
                    <Typography style={{fontSize:22,fontWeight:500}}>
                        Mes Favoris
                    </Typography>
                </Box>
                <Box padding={3} className={classes.GridSystem} >
                    {renderedItem(classes)}
                </Box>
            </Box>

        </Box>
    )
}

export default FavoriteItem
