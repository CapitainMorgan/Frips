import React, { useEffect,useState } from "react"
import ItemForm from "./ItemForm"
import { useSelector,useDispatch } from "react-redux"
import { createItem, getCreatinItemInfo, getItemCreationInfo } from "../../actions"
import axios from "axios"
import { Box, CircularProgress } from "@material-ui/core"
import { useLocation, useNavigate } from "react-router-dom"


const initialValues = {
    
  
    Titre: '',
    Description: '',
    image:[],
    Catalogue:"",
    Brand:"",
    Size:"",
    Color:[],
    Price:"",
    State:""

}


const ItemCreate = () =>{
    const loading = useSelector(state => state.itemInfo.loading)
    const loaded = useSelector(state => state.itemInfo.loaded)
    const history = useNavigate()

    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getItemCreationInfo())

       
       
        
        
        
    },[dispatch,loading,loaded])

 
    
    if(loading && !loaded){
        return (
          <Box height="100vh" width="100%" display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={100}/>
          </Box>
        )
      }

    

    const onSubmit = (values,image) =>{
        dispatch(createItem(values,image,history))
    }

    return(
        <div>
            <ItemForm initialValues={initialValues} onSubmit={onSubmit}></ItemForm>
        </div>
    )
}

export default ItemCreate