import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { register } from "../../actions";
import TextError from "../Items/formUpload/errorText";
import CostumStepper from "./CostumStepper";
import FirsStep from "./FirsStep";
import SecondStep from "./SecondStep";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

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
  },
}));

const initialValue = {
  Email: "",
  Pseudo: "",
  Password: "",
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
};

const regExp = "w*[a-zA-Z]w*";

const validationSchema = yup.object({
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
  firstName: yup.string("Entrez un prénom").required("Un prénom est requis"),
  name: yup.string("Entrez un nom").required("Un nom de famille requis"),
  Jour: yup.number("Entrez un jour ").required("Un jour est requise"),
  Mois: yup.number("Entrez un Mois ").required("Un mois est requise"),
  Annee: yup.number("Entrez une année ").required("Une année est requise"),
  NPA: yup.number("Entrez un NPA ").required("Un NPA est requis"),
  Rue: yup.string("Entrez une rue ").required("Un rue est requise"),
  Localite: yup
    .string("Entrez une localitée ")
    .required("Une localitée est requise"),
  Numero: yup.number("Entrez un  numéro").required("Un numéro est requis"),
  IBAN: yup.string("Un IBAN est requis"),
});

function getSteps() {
  return ["Créer un profile", "Valider ses informations personnels"];
}


const renderStepper = (step, formik) => {
  switch (step) {
    case 0:
      return <FirsStep formik={formik} />;
    case 1:
      return <SecondStep formik={formik} />;
    default:
      return <React.Fragment />;
  }
};

export const Register = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const error = useSelector((state) => state.auth.error);
  const history = useNavigate();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
    dispatch(register(values, from, history));
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
          width={500}
          className={classes.BoxShadow}
          display="flex"
          flexDirection="column"
          padding={3}
        >
          <CostumStepper activeStep={activeStep} steps={steps} />

          <Box display="flex" justifyContent="center" padding={2}>
            <Typography style={{ fontSize: 25, fontWeight: 500 }}>
              {getSteps()[activeStep]}
            </Typography>
          </Box>

          <Formik
            enableReinitialize
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnBlur
            validateOnChange
          >
            {(formik) => {
              return (
                <Form>
                  {renderStepper(activeStep, formik)}

                  {error ? (
                    <Box marginTop={3}>
                      <TextError error={error} />
                    </Box>
                  ) : null}
                  {activeStep === steps.length ? (
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
                        {activeStep === steps.length  ? "Retour" : "Suivant"}
                      </Button>
                    </Box>
                  )}

                  <Box marginTop={3} width={"100%"} display="flex">
                    <Typography style={{ fontSize: 15 }}>
                      Déjà un compte ?
                    </Typography>
                    <Typography
                      style={{ fontSize: 15, paddingLeft: 5 }}
                      color="primary"
                    >
                      <Link to="/login">Se connecter</Link>
                    </Typography>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Box>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
            <Button onClick={handleReset} className={classes.button}>
              Valider
            </Button>
          </div>
        ) : null}
      </div>
    </Box>
  );
};

export default Register;
