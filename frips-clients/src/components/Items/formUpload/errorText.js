import React from "react"
import { makeStyles } from "@material-ui/core"
import { Typography,Box } from "@material-ui/core"


const TextError = (props) =>{
    if(props.error){
        return (
            <Typography style={{color:"red", fontSize:"1.0em"}}>
            {props.error.msg} !
        </Typography>
        )
    }
    else{
        return (
            <Typography style={{color:"red", fontSize:"0.8em"}}>
            {props.children}
        </Typography>
        )
    }
}

export default TextError;