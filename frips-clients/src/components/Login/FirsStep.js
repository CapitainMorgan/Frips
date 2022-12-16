import { Box, Typography } from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../Items/formUpload/errorText";
import TextFieldLogin from "./TextFieldLogin";

const FirsStep = ({ formik }) => {
  return (
    <React.Fragment>
     

      <Box marginTop={3}>
        <Field
          name="Pseudo"
          id="Pseudo"
          component={TextFieldLogin}
          placeholder={"Nom d'utilisateur"}
        />

        <Box>
          <ErrorMessage name="Pseudo" component={TextError} />

          {formik.values.Pseudo !== "" ? (
            <Typography>
              Attention ton nom pseudo sera unique et ne pourra plus être
              changé.
            </Typography>
          ) : null}
        </Box>
      </Box>

      <Box marginTop={3}>
        <Field
          name="Email"
          id="Email"
          component={TextFieldLogin}
          placeholder={"Adresse Email"}
        />
        <ErrorMessage name="Email" component={TextError} />
      </Box>

      <Box marginTop={3}>
        <Field
          name="Password"
          id="Password"
          component={TextFieldLogin}
          placeholder={"Mot de passe"}
        />
        <ErrorMessage name="Password" component={TextError} />
      </Box>
    </React.Fragment>
  );
};

export default FirsStep;
