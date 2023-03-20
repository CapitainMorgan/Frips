import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { changeIban, registerUser, userIfExist } from "../../actions";
import { REGISTER_FAILURE, RESET_ERROR } from "../../actions/type";
import axiosInstance from "../../api/api";
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

const regExp = "w*[a-zA-Z]w*";

const validationSchema = yup.object().shape({
  IBAN: yup
    .string()
    .matches(
      /^CH\d{2}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d$/,
      "Veuillez entrer un IBAN valide"
    )
    .required("Un IBAN est requis"),
});

export const RegisterSeller = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [iban, setIban] = useState("");

  const {
    control,
    register,
    getValues,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue,
  });
  const history = useNavigate();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleChange = (event) => {
    console.log(event.target.value);
    const input = event.target.value.replace(/\s/g, "");
    let formatted = input.match(/.{1,4}/g)?.join(" ");
    console.log(formatted,input)
    if (formatted && input.length > 4 && input.length % 4 === 0) {
      formatted += "";
    }
    return formatted || "";
  };

  const onSubmit = (values) => {
    dispatch(changeIban(values.IBAN, from, history));
  };

  return (
    <Box width={"100%"} style={{ backgroundColor: "#F5f5f3" }} height="100%">
      <Box height={"5vh"} />
      <Box
        width={"100%"}
        display="flex"
        height={"100%"}
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
          <Typography variant="h6">
            Veuillez entrer un IBAN pour recevoir vos paiements
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
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterSeller;
