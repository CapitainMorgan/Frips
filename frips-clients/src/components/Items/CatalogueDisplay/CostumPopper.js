import { Box, Button, ClickAwayListener, Menu, MenuItem,makeStyles, ListItem } from '@material-ui/core'
import React, {useState} from 'react'
import { Chip ,Typography,IconButton,Popper} from '@material-ui/core'
import { Catalogue } from '../staticItems/staticItemName'
import { ListItemIcon } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Checkbox } from '@material-ui/core'
import { useDispatch ,useSelector} from 'react-redux'
import { addToFilter, removeToFilter } from '../../../actions'



import _, { filter } from "lodash"
import CostumPriceComponent from './CostumPriceComponent'
import CostumCatalogueComponent from './CostumCatalogueComponent'

const useStyles = makeStyles((theme) => ({
     
 
    BoxShadow:{
      boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
      backgroundColor:"white",
      maxHeight:350,
      overflow:"auto"
    },
    ItemBox:{
      fontSize:16,
    },
    
  checkBox: {  
      position:"absolute", 
      '&:hover': {
          background: 'transparent',
      },
      right:0
  },
  hover: {
    "&:hover": {
      backgroundColor: "rgba(205, 217, 231,1)"
    }
}}
));

const idsAll = [997,998,999]
const renderCatalogueCategorie = (infoItems,classes,dispatch,label,filter)  =>{
    
    

    if(label ==="Price"){
        return (
            <CostumPriceComponent label={label} />
        )
    }

    if(label ==="Catalogue"){
        return (
            <CostumCatalogueComponent label={label} filter={filter} />
        )
    }


    if(label ==="sortedBy"){
        return infoItems.map((item,index)=>{
            
            return(
                <MenuItem className={classes.ItemBox}

                onClick={()=>{
                    if(filter?.sortedBy ===item){
                        dispatch(removeToFilter(item))
                    }
                    else{
                        dispatch(addToFilter(item,label))

                    }
                }} >
                
                <Typography style={{fontSize:18 }}>
                {item.Name}
                </Typography>
                <Checkbox className={classes.checkBox}
            style={{backgroundColor:"transparent"}}

            checked={filter?.sortedBy ===item}  
            color="primary" disableFocusRipple disableRipple disableTouchRipple  
            
            >

        </Checkbox>
            </MenuItem>
            )    

        
    })

    }
   
    
    ///Sale teube oublie ap
        return infoItems.map((item,index)=>{
            
                return(
                    <MenuItem className={classes.ItemBox}
                    
                    onClick={()=>{
                        if(_.includes(filter[label],item)){
                            dispatch(removeToFilter(item))
                        }
                        else{
                            dispatch(addToFilter(item,label))
    
                        }
                    }} >
                    
                    <Typography style={{fontSize:18 }}>
                {item.Name}
                </Typography>
                    <Checkbox className={classes.checkBox}
                style={{backgroundColor:"transparent"}}
    
                checked={_.includes(filter[label],item)}  
                color="primary" disableFocusRipple disableRipple disableTouchRipple  
                
                >
    
            </Checkbox>
                </MenuItem>
                )    

            
        })
    
}



const CostumPopper = ({item}) => {
    const {label,array} = item
    const [Anchor, setAnchorEl] = useState(null)
    const classes = useStyles()
      const dispatch  = useDispatch()
       const filter = useSelector(state => state.filterCatalogue.AllFilter)

    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget)
    }
    
      
   
    
    const handleClickAway = () => {

       setAnchorEl(null)
      }


    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box className={classes.hover}   border={1}  margin={2} borderRadius={2} display="flex" alignItems="center"  style={{borderColor:Anchor ? "rgba(130, 160, 194,1)" :"#CCCCCC",
            backgroundColor:Anchor || (filter[label]?.length!==0 && 
            label!== "sortedBy" && label!=="Price" ) ||( label ==="Price" && filter[label][0]!==0)
            
            
            
             ?  "rgba(205, 217, 231,1)":""
             
            }}>
                    <MenuItem onClick={handleClick} >
                        <Typography style={{fontSize:16}} >
                            {label!== "sortedBy" ? label : "Trier par" }

                        </Typography>
                        <ListItemIcon style={{paddingLeft:0, minWidth:0}} >
                            {Anchor ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </ListItemIcon>

                    </MenuItem>

                    
                    

                    <Popper
                            
                       
                        anchorEl={Anchor}
                        placement="bottom-start"
                       
                        style={{minWidth:300,maxWidth:"50%"}}
                                  modifiers={{
                            offset: {
                            enabled: true,
                            offset: '0, 5',


                        },
                    
    }
                        }
                        open={Boolean(Anchor)}>
                            
                            
                            
                            <Box className={classes.BoxShadow} >
                           
                              {renderCatalogueCategorie(array,classes,dispatch,label,filter)}

                            </Box>
                            </Popper>

                   
                </Box>
        </ClickAwayListener>
    )
}

export default CostumPopper
