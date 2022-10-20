import { Box, Button,makeStyles, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React,{useState}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {Link, useLocation, useNavigate} from "react-router-dom"
import * as yup from 'yup';
import {Formik,Form,Field, ErrorMessage} from "formik"
import TextError from '../Items/formUpload/errorText';
import { register } from '../../actions';

const useStyles = makeStyles((theme) => ({
     
    
    formContainer: {
        boxSizing:"border-box",
        width:300,
        margin:"auto",
        [theme.breakpoints.down('sm')]: {
            width:"auto",
            
            left:"auto",
            right:"auto",
            padding:20,
        },
        
      },
      BoxShadow:{
        boxShadow:"0 1px 4px 0 rgb(197 197 197 / 50%)",
        backgroundColor:"white"
      },

}));

const initialValue = {
    Email:"",
    Pseudo:"",
    Password:""
}




const TextFieldLogin = ({placeholder,field,form}) =>{
    return (
        <TextField
        fullWidth
        id={field.name}
        name={field.name}
        value={field.value}
        autoComplete="off"
        onChange={e=>form.setFieldValue(field.name,e.target.value)}

        placeholder={placeholder}
        InputProps={{
            spellCheck:false,

            style:{fontSize:16}
        }}
        
        />
    )

}
const regExp = "\w*[a-zA-Z]\w*"


const validationSchema = yup.object({
    Pseudo: yup
    .string("Un nom d'utilisateur est requi")
    .min(3,"Votre pseudo doit au moins faire 3 charactères")
    .matches(regExp, {message: 'Doit avoir au moins une lettre', excludeEmptyString: true})
    .required(`Un nom d'utilisateur est requis`),
    Email: yup
      .string('Enter your Email')

      .email("Veuillez entrer un Email valide")

      .required('Veuillez entrer un Email valide'),
    Password: yup
      .string("Entrez un mot de passe ")
      .min(8,"Le mot de passe  doit au moins avoir 8 charactères")
      .required('Un mot de passe est requise'),
      
      
     
      
  

    });


export const Register = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [showPassword,setshowPassword] = useState(false)
    const error = useSelector(state => state.auth.error)
    const history = useNavigate()
    
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit=(values)=>{
    
    dispatch(register(values,from,history))
}


    return (
        <Box width={"100%"} style={{backgroundColor:"#F5f5f3"}} height={"100%"}>
                <Box height={"5vh"} />
            <Box>
            <Box width={"100%"} height={600} display="flex" justifyContent="center" alignItems="center">
                <Box width={375}  className={classes.BoxShadow} display="flex" flexDirection="column" padding={3}>
                    
                    <Box display="flex" justifyContent="center">
                        <Typography style={{fontSize:25,fontWeight:500}}>
                            Créer un compte
                        </Typography> 
                    </Box>

                   <Formik enableReinitialize initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit} validateOnBlur validateOnChange >
                        {formik =>{
                            
                            return (<Form>
                            <Box  marginTop={3}>
                            
                            <Field  name="Pseudo" id="Pseudo" component={TextFieldLogin}   placeholder={"Nom d'utilisateur"}  />
                            
                            <Box>

                            <ErrorMessage name="Pseudo" component={TextError} />

                            {formik.values.Pseudo !=="" ? <Typography>

                                Attention ton nom d'utilisateur sera unique et ne pourra plus être changé.
                            </Typography> :null}

                    </Box>
                    </Box>

                    <Box marginTop={3}>
                    <Field name="Email" id="Email" component={TextFieldLogin} placeholder={"Adresse Email"} />
                    <ErrorMessage name="Email" component={TextError} />
                    </Box>

                    <Box marginTop={3}>
                    <Field name="Password" id="Password" component={TextFieldLogin} placeholder={"Mot de passe"} />
                    <ErrorMessage name="Password" component={TextError} />
                    
                    </Box>

                    {error ? <Box marginTop={3}>
                    <TextError error={error} />

                    
                    </Box>:null}


                    <Box marginTop={5} width={"100%"}>
                    <Button style={{width:"100%",height:50}} variant="contained" color="primary" type="submit"  >
                        <Typography style={{fontSize:14,color:"white"}}>
                        S'inscrire
                        </Typography>
                    </Button>
                    
                    </Box>

                    <Box marginTop={3} width={"100%"} display="flex">
                    <Typography style={{fontSize:15}} >
                        Déjà un compte ?
                        </Typography>
                        <Typography style={{fontSize:15,paddingLeft:5}} color="primary">
                        <Link to="/login" >
                        Se connecter
                        </Link>                        
                       
                        </Typography>
                    </Box>

                            </Form>)
                        }}

                   </Formik>
                    
                        
                        

                </Box>
            </Box>
                
           
            </Box>
        </Box>
    )
}


export default Register;
