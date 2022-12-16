import { Box, Typography } from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../Items/formUpload/errorText";
import TextFieldLogin from "./TextFieldLogin";

const SecondStep = ({ formik }) => {
  return (
    <React.Fragment>
        <Box>
            Ces informations serviront comment garants à des fins juridiques et ne serviront aucunement à des fins de profiling
        </Box>
      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Field
            name="firstName"
            id="firstName"
            component={TextFieldLogin}
            placeholder={"Prénom"}
          />
          <ErrorMessage name="firstName" component={TextError} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Field
            name="name"
            id="name"
            component={TextFieldLogin}
            placeholder={"Nom de famille"}
          />
          <ErrorMessage name="name" component={TextError} />
        </Box>
      </Box>
      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Field
            name="Jour"
            id="Jour"
            component={TextFieldLogin}
            placeholder={"Jour"}
          />
          <ErrorMessage name="Jour" component={TextError} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Field
            name="Mois"
            id="Mois"
            component={TextFieldLogin}
            placeholder={"Mois"}
          />
          <ErrorMessage name="Mois" component={TextError} />
        </Box>
        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Field
            name="Annee"
            id="Annee"
            component={TextFieldLogin}
            placeholder={"Année"}
          />
          <ErrorMessage name="Annee" component={TextError} />
        </Box>
      </Box>

      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"75%"}>
          <Field
            name="Rue"
            id="Rue"
            component={TextFieldLogin}
            placeholder={"Rue"}
          />
          <ErrorMessage name="Rue" component={TextError} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"25%"}>
          <Field
            name="Numero"
            id="Numero"
            component={TextFieldLogin}
            placeholder={"Numéro"}
          />
          <ErrorMessage name="Numero" component={TextError} />
        </Box>
      </Box>

      <Box marginTop={3} display="flex">
        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Field
            name="NPA"
            id="NPA"
            component={TextFieldLogin}
            placeholder={"NPA"}
          />
          <ErrorMessage name="NPA" component={TextError} />
        </Box>

        <Box display={"flex"} flexDirection="column" width={"50%"}>
          <Field
            name="Localite"
            id="Localite"
            component={TextFieldLogin}
            placeholder={"Localité"}
          />
          <ErrorMessage name="Localite" component={TextError} />
        </Box>
      </Box>
      <Box marginTop={3}>
        <Field
          name="IBAN"
          id="IBAN"
          component={TextFieldLogin}
          placeholder={"IBAN"}
        />
        <ErrorMessage name="IBAN" component={TextError} />
      </Box>
      
      
    </React.Fragment>
  );
};

export default SecondStep;
