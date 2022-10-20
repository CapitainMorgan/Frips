import React from "react"



import { Input ,Box,ClickAwayListener,Popper,TextField,InputAdornment,Dialog,IconButton,Typography} from "@material-ui/core"
import { ErrorMessage } from "formik"
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";



export const CostumTextField = ({ field, form,error, ...props }) =>{
    

    return(
        <Input
                        
                        placeholder="Ex: Pull bleu marque X"
                        autoComplete="off"
                        style={{fontSize:16}}
                        spellCheck={false}
                        value={field.value}
                        onChange={e=>form.setFieldValue(field.name,e.target.value)}
                        fullWidth
                        
                        />
    )
}

export const CostumTextFieldDescription = ({ field, form, meta,error, ...props }) =>{
   
    return(
        <Input
                        
                        placeholder="Ex: couleur,utilisation"
                        autoComplete="off"
                        value={field.value}
                        spellCheck={false}
                        style={{fontSize:16}}

                        onChange={e=>form.setFieldValue(field.name,e.target.value)}
                        fullWidth
                        multiline
                        inputProps={{maxLength:275}}

                        
                        />
    )
}

export const CostumPriceField = ({ field, form,error, ...props }) =>{
    

    return(
        <Input
                        
                        placeholder="0.00 CHF"
                        autoComplete="off"
                        style={{fontSize:16}}
                        spellCheck={false}
                        {...field}
                        fullWidth
                        
                        />
    )
}





