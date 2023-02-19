import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  makeStyles, Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { registerUser, userIfExist } from "../../actions";
import { REGISTER_FAILURE, RESET_ERROR } from "../../actions/type";
import axiosInstance from "../../api/api";
import StepTextError from "../Items/formUpload/errorText";
import CostumStepper from "./CostumStepper";
import FirsStep from "./FirsStep";
import SecondStep from "./SecondStep";
const useStyles = makeStyles((theme) => ({
  formContainer: {
    boxSizing: "border-box",
    width: 300,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
  BoxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    width:500,
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
    },
  },
}));

const initialValue = {
  step1: {
    Email: "",
    Pseudo: "",
    Password: "",
  },
  step2: {
    firstName: "",
    name: "",
    NPA: "",
    Annee: "",
    Localite: "",
    Mois: "",
    Jour: "",
    Rue: "",
    Numero: "",
    IBAN: "",
  },
};

const regExp = "w*[a-zA-Z]w*";

const validationSchema = yup.object().shape({
  step1: yup.object().shape({
    Pseudo: yup
      .string("Un nom d'utilisateur est requi")
      .min(3, "Votre pseudo doit au moins faire 3 charactères")
      .matches(regExp, {
        message: "Doit avoir au moins une lettre",
        excludeEmptyString: true,
      })
      .required(`Un nom d'utilisateur est requis`),
    Email: yup
      .string("Enter your Email")

      .email("Veuillez entrer un Email valide")

      .required("Veuillez entrer un Email valide"),
    Password: yup
      .string("Entrez un mot de passe ")
      .min(8, "Le mot de passe  doit au moins avoir 8 charactères")
      .required("Un mot de passe est requise"),
  }),
  step2: yup.object().shape({
    firstName: yup
      .string("Entrez un prénom")
      .matches(/^[^\d]+$/, "Veuillez indiquer seulement votre prénom")
      .required("Un prénom est requis"),
    name: yup
      .string("Entrez un nom")
      .matches(/^[^\d]+$/, "Veuillez indiquer seulement votre nom de")
      .required("Un nom de famille requis"),
    Jour: yup
      .string("Entrez un jour ")
      .matches(/^[0-9]*$/, "Veuillez seulement utiliser des nombres")
      .required("Un jour est requis"),
    Mois: yup
      .string("Entrez un mois ")
      .matches(/^[0-9]*$/, "Veuillez seulement utiliser des nombres")
      .required("Un mois est requis"),
    Annee: yup
      .string("Entrez une année ")
      .matches(/^[0-9]*$/, "Veuillez seulement utiliser des nombres")
      .required("Une année est requise"),
    NPA: yup.string("Entrez un NPA ").required("Un NPA est requis"),
    Rue: yup
      .string("Entrez une rue ")
      .matches(
        /^[^\d]+$/,
        "Veuillez indiquer seulement le nom de la rue dans ce champs s'il vous plaît"
      )
      .required("Un rue est requise"),
    Localite: yup
      .string("Entrez une localitée ")
      .matches(
        /^[^\d]+$/,
        "Veuillez indiquer seulement le nom de votre localité"
      )
      .required("Une localitée est requise"),
    Numero: yup
      .string("Entrez un  numéro")
      .matches(/^[0-9]*$/, "Veuillez seulement utiliser des nombres")
      .required("Un numéro est requis"),
    IBAN: yup.string().matches(/CH\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{1}|CH\d{19}/,"Veuillez entrer un IBAN valide").required("Un IBAN est requis")
  }),
});
/*     dispatch(register(values, from, history));
 */

const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
function getSteps() {
  return ["Créer un profile", "Valider ses informations personnels"];
}
const check = async (Email, Pseudo, dispatch) => {
  axiosInstance
    .post("/api/user/checkUser", { Email: Email, Pseudo: Pseudo })
    .then(() => {})
    .catch((error) => {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response.data,
      });
    });
};

export const Register = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const {
    control,
    register,
    getValues,
    watch,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const pseudo = watch("step1.Pseudo"); // you can also target specific fields by their names

  const { Email, Pseudo, Password } = getValues().step1;

  const renderStepper = (step) => {
    switch (step) {
      case 0:
        return (
          <FirsStep
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            getValues={getValues}
            errors={errors}
            showPassword={showPassword}
            setshowPassword={setshowPassword}
          />
        );
      case 1:
        return (
          <SecondStep
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            getValues={getValues}
            errors={errors}
          />
        );

      default:
        return <React.Fragment />;
    }
  };

  const error = useSelector((state) => state.auth.error);
  const history = useNavigate();



  useEffect(()=>{
    return () =>{
      dispatch({type:RESET_ERROR})
    }
  },[])

  const handleNext = async () => {
    const results = await trigger([
      "step1.Email",
      "step1.Pseudo",
      "step1.Password",
    ]);

    if (activeStep === 0 && results) {
      dispatch(userIfExist(getValues().step1, setActiveStep, activeStep));
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = (values) => {
    dispatch(registerUser(values, from, history));

  };

  return (
    <Box width={"100%"} style={{ backgroundColor: "#F5f5f3" }}>
      <Box height={"5vh"} />
      <Box
        width={"100%"}
        display="flex"
        justifyContent="center"
        flexDirection={"column"}
        alignItems="center"
      >
        <Box height={"5vh"} />

        <Box
          
          className={classes.BoxShadow}
          display="flex"
          flexDirection="column"
          marginBottom={10}
          padding={3}
        >
          <CostumStepper activeStep={activeStep} steps={steps} />

          <Box display="flex" justifyContent="center" padding={2}>
            <Typography style={{ fontSize: 25, fontWeight: 500 }}>
              {getSteps()[activeStep]}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepper(activeStep)}
           

            {error ? (
              <Box marginTop={3}>
                <StepTextError text={error?.msg} />
              </Box>
            ) : null}
            {activeStep === steps.length-1 ? (
              <Box marginTop={5} width={"100%"}>
                <Button
                  style={{ width: "100%", height: 50 }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  <Typography style={{ fontSize: 14, color: "white" }}>
                    S'inscrire
                  </Typography>
                </Button>
              </Box>
            ) : (
              <Box display={"flex"} marginTop={3}>
                <Button
                  style={{ width: "50%", margin: 10 }}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Retour
                </Button>
                <Button
                  style={{ width: "50%", margin: 10 }}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length ? "Retour" : "Suivant"}
                </Button>
              </Box>
            )}

            <Box marginTop={3} width={"100%"} display="flex">
              <Typography style={{ fontSize: 15 }}>Déjà un compte ?</Typography>
              <Typography
                style={{ fontSize: 15, paddingLeft: 5 }}
                color="primary"
              >
                <Link to="/login">Se connecter</Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
