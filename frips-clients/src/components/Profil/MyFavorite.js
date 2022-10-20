import React,{useEffect} from 'react'
import { Box, Typography,CardHeader,Card,Avatar,IconButton,CardActionArea ,makeStyles} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch,useSelector } from 'react-redux';
import {fetchMyFavorite} from "../../actions/index"
import { CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

    boxShadow:{

        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white",
        
    },GridSystem:{
        display:"grid",
        gridTemplateColumns:"repeat(3,33%)",
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

const renderedItem = (classes,state,history) =>{

    
    return state.map((item,index) =>{
        return(
            <Box width={"100%"} height={"100%"} padding={1} position="relative" key={item.id} id={item.id}>
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
                    <CardActionArea style={{width:"100%",height:300}} onClick={()=>{
                    history(`/items/${state[index].id_Item}`)

                    }}>
                    <img src={`http://localhost:5000/images/${state[index].item.image[0].id_Item}/${state[index].item.image[0].image}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />

                    </CardActionArea>
                    </Box>
                    <Box padding={2}>
                        <Typography style={{fontSize:16,fontWeight:600}}>
                        {state[index].item.Price}
                        </Typography>
                        <Typography>
                        {state[index].item.Size}
                        </Typography>
                        <Typography>
                        5

                        </Typography>
                    </Box>
                    <Box position="absolute" bottom={20} right={15} display="flex" alignItems="center">
                        <Typography style={{fontSize:16}}>
                            Modifier
                        </Typography>
                        <IconButton onClick={()=>{
                            
                        }}> <EditIcon/> </IconButton>
                    </Box>
                    

            </Card>
            
        </Box>
        )
    })
}

const MyFavorite = () => {
    const history = useNavigate()
    const dispatch = useDispatch()

   let state = useSelector(state => state.favoriteReducers.favorit)
    useEffect(() => {
        dispatch(fetchMyFavorite())

    }, [dispatch])
    const classes = useStyles()
  
    console.log(state)
    if(!state){
        return (
          <Box width={"100%"} height={"100vh"} style={{backgroundColor:"#F5f5f3"}} justifyContent="center" display="flex" alignItems="center">
              <CircularProgress size={100} />  
          </Box>
        )
      } 

    return (
        <Box width={"100%"} height={"100%"}  style={{backgroundColor:"#F5f5f3"}}>
            <Box height={"15vh"}/>
            <Box className={classes.floatContentArticle}>
                <Box margin="auto" padding={3}>
                    <Typography style={{fontSize:22,fontWeight:500}}>
                        My Favorite
                    </Typography>
                </Box>
                <Box padding={3} className={classes.GridSystem} >
                {state ? renderedItem(classes,state,history) : null}

                </Box>
            </Box>

        </Box>
    )
}

export default MyFavorite
