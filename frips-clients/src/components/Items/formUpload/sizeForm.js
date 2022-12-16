

import React , {useState,useRef, useEffect}from "react"
 

import { Box } from "@material-ui/core";
import { TextField,InputAdornment } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Popper } from "@material-ui/core";
import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { Divider } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { renderArraySize } from "../staticItems/staticItemName";
import { arraySize } from "../staticItems/staticItemName";
import { MenuItem,Dialog,Typography,IconButton } from "@material-ui/core";

import CloseIcon from '@material-ui/icons/Close';


const useStyle = makeStyles(theme =>({
    
    checkBox: {  
        position:"absolute", 
        '&:hover': {
            background: 'transparent',
        },
        right:0
    },BoxItem:{
        height:50,
        fontSize:16,
    },
    Dialog: {
        width:300,
        height:"auto",
    }
    
}))





const SizeForm = ({form,field,mobile,size, ...props}) =>{

    const classes = useStyle()
    const [anchorEl, setAnchorEl] = useState(null);



    const renderedStateClothes = renderArraySize(arraySize,size).map((item,index) =>{
        return (
            
            <Box style={{position:"relative"}}>
            {index!==0 ? <Divider></Divider>: null}
            <MenuItem className={classes.BoxItem} onClick={()=>{
                form.setFieldValue("Size",item.size)
                setAnchorEl()
            }}>
                {item.size}
                <Checkbox className={classes.checkBox}
                style={{backgroundColor:"transparent"}}

                checked={item.size===field.value}  
                color="primary" disableFocusRipple disableRipple disableTouchRipple  
                
                >

            </Checkbox>
            </MenuItem>
            

            </Box>
                   
                   
                   
        )
    })
    


    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget)
    }

    

      
      
    
    const handleClickAway = () => {

        
        
       setAnchorEl(null)
      }

    return(
        <ClickAwayListener onClickAway={handleClickAway}>

        <Box >
           <TextField
                        onClick={handleClick}
                        autoComplete="off"
                        
                        placeholder="Selectionne une taille"
                        
                        
                        value={field.value}
                        fullWidth
                       InputProps={{
                           style:{fontSize:16},

                           
                           
                           endAdornment:(
                               
                            <InputAdornment position="end" className={classes.pointer}>
                            {Boolean(anchorEl) ? <ExpandLess/>: <ExpandMore/>}
                            </InputAdornment>
                        )
                        }}
                      
                        
                        />  
                        {!mobile ?
                            <Popper
                            
                            disablePortal={false}
                        style={{width:"35%"}}

                        anchorEl={anchorEl}
                        placement="bottom"
                        
                        
        
                        open={Boolean(anchorEl)}>
                            <Box style={{backgroundColor:"white",position:"absolute"}} width={"100%"}  >
                                {renderedStateClothes}
                                    </Box>
                            </Popper>
                        :
                        
                        <Dialog open={Boolean(anchorEl)}>
                            <Box className={classes.Dialog} display="flex" flexDirection="column" >
                                <Box minHeight={80} display="flex" justifyContent="center" alignItems="center" position="relative">
                                    <Typography>
                                        Taille
                                    </Typography>
                                    <Box padding={3} position="absolute"  right={0}>
                                        <IconButton onClick={handleClickAway} ><CloseIcon/></IconButton>
                                    </Box>
                                </Box>

                                <Box  style={{backgroundColor:"white"}} width={"100%"}>

                                {renderedStateClothes}

                                </Box>

                                

                            </Box>



                        </Dialog>
                        
                        
                        }

        </Box>

        </ClickAwayListener>
    )
}

export default SizeForm;