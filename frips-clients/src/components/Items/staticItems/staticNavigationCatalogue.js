

import React , {useState,useRef, useEffect}from "react"
 
import { Select,MenuItem,Popover, Menu  } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Box } from "@material-ui/core";
import { TextField,InputAdornment } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Popper } from "@material-ui/core";
import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { Divider } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { List } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

import { NativeSelect } from "@material-ui/core";






export const navigationCatalogue = (id,rank,classes,setNavigationValue,form,SelectableItem,setSize=null,mobile,setCatalogue) =>{
    
    const scrollItem = rank[rank.length-1].array.map((item,index)=>{
        if(item.type === "list"){
            return(
                <Box >
                        <MenuItem
                        key={index}
                        disableFocusRipple
                        disableTouchRipple
                        className={classes.BoxItem} onClick={()=>{

                            setNavigationValue([...rank, {upId:item.Name ,id:rank.length,array:item.subitems}])

                         }}>

                            {item.Name}

                            <IconButton className={classes.Arrow} disableFocusRipple disableRipple disableTouchRipple> <ChevronRightIcon style={{fontSize:25}} /> </IconButton>

                         </MenuItem>

                    </Box>
        )

    }

    else{
        return(
            <Box >
                <MenuItem className={classes.BoxItem} key={index}  onClick={()=>{
                    if(item.sizeType){
                        setSize(item.sizeType)

                    }
                    form.setFieldValue("Catalogue",item.id)
                    setNavigationValue([])
                    SelectableItem()
                    }} >
                    {item.Name}
                    <Checkbox 
           
                    style={{backgroundColor:"transparent"}}

                    checked={item.id===id} className={classes.checkBox} 
                    color="primary" disableFocusRipple disableRipple disableTouchRipple  
                    >

                    </Checkbox>    
                </MenuItem>
           
            </Box> 
        )
    
}





}


)

        return( 
            <Box >

            
                <Box  className={classes.BoxCurrentItem}>

                    <IconButton onClick={()=>{

                    setNavigationValue(rank.filter((item,index)=> index !== (rank.length-1) ))   

                    }} className={classes.ArrowBackIcon} disableFocusRipple disableRipple disableTouchRipple><ArrowBackIcon/></IconButton>
            
                    <Box>
                        <Typography style={{padding:16 ,fontWeight:500, fontSize:16}}  >

                             {rank[(rank.length-1)].upId}

                        </Typography>

                    </Box>


                </Box>

                

            {rank[rank.length-1].array.length < 6 ? scrollItem: !mobile ? <Box  style={{maxHeight: 200, width:"100%", overflow:"auto" }}> {scrollItem} </Box> : <Box  style={{height:"100%",overflow:"auto"}}> {scrollItem} </Box> }                               
        
        
                


        </Box>

        )
        

        
           

            
    

}