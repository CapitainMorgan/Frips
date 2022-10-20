import React, { useEffect,useState } from "react"
import { Box, Button, CardHeader, Divider, IconButton, makeStyles, Typography,Card,Avatar ,Popover,CardActionArea, CircularProgress} from "@material-ui/core"
import { useDispatch,useSelector } from "react-redux"
import { fetchItem, fetchItems } from "../../../actions"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ImageGalleryPreview from "./ImageGalleryPreview";
import Rating from '@material-ui/lab/Rating';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ItemInformation from "./itemInformation";
import ItemProfil from "./ItemFromProfil";
import { useParams } from "react-router-dom";


const images = ["http://lorempixel.com/800/800/nature","http://lorempixel.com/800/800/nature/2","http://placekitten.com/800/800"];

const useStyles = makeStyles((theme) => ({

    boxShadow:{
        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white",
        display:"flex",
        alignItems:"center"
    },
    
    floatContentInfomrationdiv:{
        width:"25%",
        height:565,
       
        
        
       
        
        [theme.breakpoints.down('sm')]: {
            width:"100%",
            left:"auto",
            right:"auto",
            padding:20,
            
    
          },
         
    },
    floatContentInformation: {
        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white",
        padding:20
      
        



    
    },
    floatContentProfil: {
        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white",
        padding:4
      
        



    
    },
    floatContentImage: {
        boxSizing:"border-box",
        paddingRight:10,
        height:565,
        minWidth:"75%",
        [theme.breakpoints.down('sm')]: {
            width:"100%",
            height:"40vh",
            left:"auto",
            right:"auto",
            padding:20,
        },
        [theme.breakpoints.up('md')]: {
          width:"75%",
          
          
          
  
        },
        [theme.breakpoints.up('lg')]: {
          width:"75%"
  
        },
      },
      ContentInformationItem:{
        width: "calc(50% - 5px)",
        marginTop:2,
      },
      ContentInformationButton:{
          
      },
      popover: {
        pointerEvents: 'none',
      },
      floatContentArticle: {
        display:"flex",
        flexWrap:"wrap",
        paddingLeft:20,
        paddingRight:20,
        justifyContent:"center",
        width:"100%",
        
        
        
        [theme.breakpoints.down('sm')]: {
          width:"100%",
          padding:0,
          display:"block"
        }
      },
      ArticleProfil:{
          width:"100%",
          height:"100%",
          backgroundColor:"blue",
        [theme.breakpoints.down('sm')]: {
            width:"100%",
            left:"auto",
            right:"auto",
           
           
            
    
          },
      },
      Container:{
        width:1300,

      [theme.breakpoints.down('sm')]: {
          width:"100%",
          left:"auto",
          right:"auto",
         
         
          
  
        },
    }

  }));

const ItemPreview = (props) =>{
    const classes = useStyles()
    let {id} = useParams()
    id = parseInt(id) 
    const dispatch = useDispatch()
    let state = useSelector(state => state.items.UniqueItem)
    let loading = useSelector(state => state.items.loading)
    let loaded = useSelector(state => state.items.loaded)

    const [flag,setFlag] = useState(false)


    useEffect(()=>{
        dispatch(fetchItem(id))
        window.scrollTo(0, 0);
        
    },[dispatch])

  
    if(loading &&state?.image?.length ===0){
      return (
        <Box height="100vh" width="100%" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress size={100}/>
        </Box>
      )
    }

  
    
    
  
    
    return(
        <Box   style={{backgroundColor:"#F5f5f3"}} display="flex" justifyContent="center"  >
            
            <Box   className={classes.Container} >
            <Box height={"10vh"} width={"100%"} ></Box>
                    {!state && !loading &&loaded ? <Box justifyContent="center" display="flex" alignItems="center" height={40}><CircularProgress></CircularProgress></Box>:
                         <Box   className={classes.floatContentArticle}  >

                            <Box display="flex" className={classes.floatContentImage}  marginBottom={5}    >
                                <ImageGalleryPreview images={state.image}></ImageGalleryPreview>
                            </Box>

                            <Box paddingLeft={2}  className={classes.floatContentInfomrationdiv} >

                                <ItemInformation state={state} classes={classes} flag={flag} setFlag={setFlag}></ItemInformation>

                            </Box>
                            <Box height={5} width={"100%"} ></Box>

                            {true ? <Box  width={"50%"}  className={classes.boxShadow}  >
                               <Box flexGrow={1} padding={2} >
                                    <Typography style={{fontSize:20,margin:5}}> Acheter en lot ! {/* reduction */}</Typography>
                                    <Typography style={{fontSize:20,margin:5}}> (number X )items encore disponible {/* reduction */}</Typography>
                                    <Typography style={{fontSize:20,margin:5}} color="primary"> X% de réduction</Typography>
                               </Box>
                               <Box padding={5}>
                                   <Button variant="contained" color="primary" style={{fontSize:16}} onClick={()=>alert("page reduction")}>

                                       Acheter
                                   </Button>
                               </Box>

                            </Box>
                            
                            :null}
                            <Box height={50} width={"100%"} ></Box>

                            <Box className={classes.ArticleProfil} >

                            <ItemProfil ></ItemProfil>

                            </Box>
                            <Box height={50} width={"100%"} />
                             <Box display="flex" width={"100%"} height={40} className={classes.boxShadow}>
                                 <Typography style={{fontSize:16}}>type d'offres similaire</Typography> 
                             </Box>

                             <Box height={2} width={"100%"} />

                            <Box className={classes.ArticleProfil} >

                            <ItemProfil ></ItemProfil>

                            </Box>
                        
                        </Box>
            
            
                
                    }
 
            </Box>

        </Box>
    )
}

export default ItemPreview