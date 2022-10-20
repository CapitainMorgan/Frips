import React from "react";

import { TextField } from "@material-ui/core"
import {useFormik} from "formik"
import { Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  input: {
      display: 'none',
    },
    card:{
      minheight: '30vw'

  }, 
  imageUpload:{
      display:"flex",
      justifyContent:"center",
      flex:1

  }
}));




export const UploadPicture = ({setimage,image}) =>{

    const imageHandleChange = (e)=>{
      if(e.target.files){
        const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
        setimage(image => image.concat(fileArray))
        
        
      }
    }
    


  const classes = useStyles()

    return(

      <React.Fragment>

        <form > 

          <input

            className={classes.input}
              accept="image/*"
                id="contained-button-file"
                multiple
              type="file"
              onChange={imageHandleChange}
              />
            <label htmlFor="contained-button-file">

            <Button startIcon={<AddIcon></AddIcon>}  variant="outlined" color="primary" component="span" >

                <Typography>

                  Ajouter des photos

                </Typography>
            </Button>
          </label>
        </form>
      </React.Fragment>
    )
}

export default UploadPicture;