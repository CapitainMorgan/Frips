import { Box,Button,Divider,Icon,makeStyles, MenuItem, Typography } from "@material-ui/core"
import React,{useEffect, useState} from "react"
import AddIcon from '@material-ui/icons/Add';
import { useDispatch,useSelector } from "react-redux";
import { fetchItem } from "../../actions";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const useStyles = makeStyles((theme) => ({

    boxShadow:{
        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white",
    },
    
    floatContentInfomrationdiv:{
        width:"30%",
        
       
        
        
       
        
        [theme.breakpoints.down('sm')]: {
            width:"100%",
            left:"auto",
            right:"auto",
            padding:20,
            
    
          },
         
    },
     
    floatContentInformation: {
        boxSizing:"border-box",
        paddingRight:10,
        height:565,
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
        width: "calc(50% - 5px)"
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
        width:"100%",
        
        
        
        [theme.breakpoints.down('sm')]: {
          width:"100%",
          padding:0,
          display:"flex",
          flexDirection:"column-reverse"
        }
      },
      InformationProduct:{
          width:"70%",
          height:"50%",
        [theme.breakpoints.down('sm')]: {
            width:"100%",
            left:"auto",
            right:"auto",
            padding:20,
           
           
            
    
          },
      },
      TypographyText:{
        fontSize:16,
        fontWeight:600
      },
      TypographyTextSub:{
        color:"grey",
        fontSize:15
      }

  }));

  
  const stripePromise = loadStripe("pk_test_51JfniQEK6bYR8YbaaWm4fKWZR0O6qG62d0wBMIC4tvaRlK5IqDJXTPwbwwkxi65mGp8MyYjF5e9hOd52KMWmy9EL0012kg008l");


const CheckOut = (props) =>{
    const classes = useStyles()
    let {id} = props.match.params
    const dispatch = useDispatch()
    const [clientSecret, setClientSecret] = useState("");
    const [success,setSuccess] = useState()

    let state = useSelector(state => state.items.UniqueItem)
    
    
    console.log(state)
     useEffect(()=>{
        dispatch(fetchItem(id))
       
        
    },[dispatch])

    console.log(stripePromise)
    

    const price = [parseInt(`${state.Price}`),7,10]

    return(
        <Box style={{backgroundColor:"#F5f5f3"}} width={"100%"} height={"100vh"}>
        <Box height={60}></Box>
            <Box width={1000}   margin="auto" className={classes.floatContentArticle} position="relative">
                <Box className={classes.InformationProduct} paddingRight={5} display="flex" flexDirection="column">
                    <Box   >
                        <Box className={classes.boxShadow}  padding={3} display="block" >
                            <Box marginBottom={5}>
                                <Typography className={classes.TypographyText} >
                                    Votre commande
                                </Typography>
                            </Box>
                            </Box>
                           

                    </Box>
                    <Box height={40} />
                    <Box>
                        <Box className={classes.boxShadow} padding={3}  display="block" >
                            <Box>
                                <Typography>
                                    Adresse
                                </Typography>
                            </Box>
                            <Box height={5}/>
                            <Box display="flex" alignItems="center"> 
                                <MenuItem  style={{width:"100%",padding:0,height:50}}>
                                    <Box flexGrow={1}>
                                    Ajouter une Adresse
                                    </Box>
                                    <Box>
                                        <AddIcon style={{fontSize:30}}/>
                                    </Box>
                                </MenuItem>
                                
                            </Box>

                        </Box>

                    </Box>
                </Box>

                <Box width={"30%"}  className={classes.floatContentInfomrationdiv} >
                    <Box padding={5} className={classes.boxShadow}>
                        <Box margin={2}>
                            <Typography className={classes.TypographyText}>
                            Résumé de la commande
                            </Typography>
                        </Box>
                        <Divider/>
                        <Box marginTop={2} display="flex">
                            <Box className={classes.ContentInformationItem}>
                                <Typography className={classes.TypographyText}>
                                    Commande
                                </Typography>
                            </Box>
                            <Box className={classes.ContentInformationItem}>
                                <Typography >
                                    {price[0]} CHF
                                </Typography>
                            </Box>
                        </Box>

                        <Box marginTop={2} display="flex" >
                            <Box className={classes.ContentInformationItem}>
                                <Typography className={classes.TypographyText} >
                                    Frais de port
                                </Typography>
                            </Box>
                            <Box className={classes.ContentInformationItem}>
                            {price[1]} CHF

                            </Box>
                        </Box>

                        <Box marginTop={2} marginBottom={2} display="flex" flexWrap="wrap" >
                            <Box className={classes.ContentInformationItem}>
                                <Typography className={classes.TypographyText}>
                                    Protection d'acheteur 
                                </Typography>
                            </Box>
                            <Box className={classes.ContentInformationItem}>
                            {price[2]} CHF

                            </Box>
                        </Box>

                        <Divider/>

                        <Box marginTop={2} display="flex">
                            <Box className={classes.ContentInformationItem}>
                                <Typography className={classes.TypographyText}>
                                    Total
                                </Typography>
                            </Box>
                            <Box className={classes.ContentInformationItem}>
                                {price.reduce((a,b)=>a+b,0)} CHF
                            </Box>
                        </Box>


                        <Box height={20} marginTop={5} display="flex" justifyContent="center" >
                            <Button style={{height:40}} color="primary" variant="contained" onClick={()=>alert("paye sale enuclé")}>Procéder au paiement</Button>
                        </Box>

                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default (CheckOut)