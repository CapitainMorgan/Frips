import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { changeIban } from "../../actions";
import StepTextError from "../Items/formUpload/errorText";
import TextFieldLogin from "../Login/TextFieldLogin";

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
    width: 500,
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
    },
  },
}));

const initialValue = {
  IBAN: "",
};

const validationSchema = yup.object().shape({
  IBAN: yup
    .string()
    .matches(
      /^CH\d{2}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s[\dA-Za-z]$/
,
      "Veuillez entrer un IBAN valide"
    )
    .required("Un IBAN est requis"),
});

export const ModalForIban = ({ open,classes,handleClose }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const history = useNavigate();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleChange = (event) => {
    const input = event.target.value.replace(/\s/g, "");
    let formatted = input.match(/.{1,4}/g)?.join(" ");

    if (formatted && input.length > 4 && input.length % 4 === 0) {
      formatted += "";
    }
    return formatted || "";
  };

  const onSubmit = (values) => {
    dispatch(changeIban(values.IBAN, from));
    handleClose()
  };

  return (
    <Dialog open={open}>
      <Box className={classes.DialogIban}>
        <Box
          width={"100%"}
          style={{ backgroundColor: "#F5f5f3" }}
          height="100%"
        >
          
              <Typography variant="h6">
                Veuillez entrer un IBAN valide
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box width={"100%"} marginTop={2}>
                  <Controller
                    name="IBAN"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <TextFieldLogin
                          placeholder="IBAN"
                          value={value}
                          onChange={(e) => {
                            onChange(handleChange(e));
                          }}
                        />
                      );
                    }}
                  />
                  <StepTextError text={errors?.IBAN?.message} />

                  <Button
                    style={{ width: "100%", height: 50, marginTop: "5vh" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    <Typography style={{ fontSize: 14, color: "white" }}>
                      Valider
                    </Typography>
                  </Button>
                  
                </Box>
              </form>
              <Button
                    style={{ width: "100%", height: 50, marginTop: "2vh" }}
                    variant="outlined"
                    color="primary"
                    type="submit"
                    onClick={handleClose}
                  >
                    <Typography style={{ fontSize: 14}}>
                      Retour
                    </Typography>
                  </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ModalForIban;
