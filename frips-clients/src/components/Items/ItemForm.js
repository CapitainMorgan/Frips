/* eslint-enable react/jsx-no-comment-textnodes */
import React, { useEffect } from "react";

import { Divider } from "@material-ui/core";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Typography, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import BrandForm from "./formUpload/BrandForm";
import DropDownItem from "./formUpload/dropDownItem";
import StateForm from "./formUpload/stateForm";
import SizeForm from "./formUpload/sizeForm";
import ColorForm from "./formUpload/colorForm";
import Dropzone from "react-dropzone";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createItem, editItem, editItemSend } from "../../actions";
import { useDispatch } from "react-redux";

import { useTheme } from "@material-ui/core/styles";
import * as yup from "yup";

import ImageBox from "./DND/SortableGrid";
import {
  CostumPriceField,
  CostumTextField,
  CostumTextFieldDescription,
} from "./formUpload/costumTextfield";
import TextError from "./formUpload/errorText";
import api from "../../api/api";
import { forEach } from "lodash";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  boxForm: {
    display: "flex",
    justifyContent: "center",
  },
  DragItem: {
    padding: 3,
    width: 200,
    height: 200,
  },
  formContainer: {
    boxSizing: "border-box",
    width: 1000,
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
  FormLittleBox: {
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
    },
  },
  SubFormLittleBox: {
    display: "block",
    width: "50%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const validationSchema = yup.object({
  image: yup
    .array()
    .min(1, "Mettez au moins une image")
    .required("Une Description est requise"),
  Titre: yup
    .string("Enter your email")

    .min(10, "Le titre doit au moins avoir 10 caractères")

    .required("Un Titre est requis"),
  Description: yup
    .string("Enter your password")
    .min(25, "La description doit au moins avoir 25 charactères")
    .required("Une Description est requise"),

  Catalogue: yup
    .string("Mettez au moins une photo")
    .required("Choississez une catégorie"),
  Brand: yup
    .string("Mettez au moins une photo")
    .required("Choississez une Marque"),
  State: yup
    .number("Mettez au moins une photo")
    .required(`Choissisez l'état de votre produit`),
  Price: yup
    .number("Doit être un nombre")
    .typeError("Doit être un nombre")

    .min(1, "Mettez un prix plus grand ou égale à 1")
    .required("Mettez un prix plus ou égale à 1"),
  Color: yup
    .array()
    .min(1, "Mettez aux moins une couleur")
    .required("Mettez aux moins une couleur"),
});

const blobToFile = (blobs) =>{
  const arrayFile = []
    for (let index = 0; index < blobs.length; index++) {
      arrayFile.push(new File())
      
    }
}

const ItemForm = ({ initialValues, edit,id,editItem}) => {
  const dispatch = useDispatch();

  const [size, setSize] = useState(null);
  const [picture, setPicture] = useState(!edit ? [] : [...editItem]);
  const history = useNavigate();

  const onSubmit = (values) => {
    if(!edit){
      dispatch(createItem(values, picture, history));
    }
    else{
     dispatch(editItemSend(values,picture,history,id))
    }
  };


  const classes = useStyles();
  const theme = useTheme();

  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const mobile = useMediaQuery(theme.breakpoints.up("sm"));

  const typeOfInput = () => {
    if (desktop) {
      return null;
    } else if (mobile) {
      return true;
    }
  };

  if (!initialValues.Titre && edit) {
    return (
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor: "#F5f5f3" }}>
      <Box width={"100%"} height={30} />
      <Formik
        enableReinitialize={true}
        onSubmit={onSubmit}
        initialValues={initialValues || null}
        validationSchema={validationSchema}
      >
        {(formik) => {
          console.log(formik.values)

          return (
            <Form>
              <Box className={classes.formContainer}>
                <Box marginTop={3} marginBottom={3}>
                  <Typography style={{ fontSize: 25, fontWeight: 500 }}>
                    {!edit ? "Mettre en Vente" : "Modification"}
                  </Typography>
                </Box>

                <Box className={classes.BoxShadow}>
                  <Box padding={3}>
                    <Typography style={{ color: "#909090" }}>
                      Ajoute jusqu'à 10 photos
                    </Typography>
                  </Box>

                  <Dropzone
                    noClick
                    noKeyboard
                    accept="image/*"
                    onDrop={(acceptedFiles) => {
                      const fileArray = Array.from(acceptedFiles).map((file) =>
                        URL.createObjectURL(file)
                      );

                      if (fileArray.length + formik.values.image.length <= 10) {
                        setPicture(picture.concat(acceptedFiles));
                        formik.setFieldValue(
                          "image",
                          formik.values.image.concat(fileArray)
                        );
                      } else {
                        const item1 = picture
                          .concat(acceptedFiles)
                          .slice(0, 10);
                        const item = formik.values.image
                          .concat(fileArray)
                          .slice(0, 10);
                        formik.setFieldValue("image", item);
                        setPicture(item1);
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps, open }) => {
                      return (
                        <Box
                          minHeight={182}
                          margin={3}
                          style={{
                            border: "1px black dashed",
                            overflow: "hidden",
                          }}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          {...getRootProps()}
                        >
                          {formik.values.image.length === 0 ? (
                            <Box>
                              <input {...getInputProps()} />
                              <Button
                                startIcon={<AddIcon></AddIcon>}
                                variant="outlined"
                                color="primary"
                                onClick={open}
                              >
                                <Typography>Ajouter des photos</Typography>
                              </Button>
                            </Box>
                          ) : (
                            <Box height={"100%"} width={"100%"}>
                              <Field
                                id="image"
                                name="image"
                                open={open}
                                edit={edit}
                                getInputProps={getInputProps}
                                picture={picture}
                                setPicture={setPicture}
                                component={ImageBox}
                              ></Field>
                            </Box>
                          )}
                        </Box>
                      );
                    }}
                  </Dropzone>

                  <Box padding={3}>
                    <ErrorMessage
                      name="image"
                      component={TextError}
                    ></ErrorMessage>
                  </Box>
                </Box>

                <Box height={30}></Box>

                <Box className={classes.BoxShadow} display="block">
                  <Box className={classes.FormLittleBox} padding={3}>
                    <Box className={classes.SubFormLittleBox}>
                      <Typography variant="h6">Titre</Typography>
                      <ErrorMessage name="Titre" component={TextError} />
                    </Box>
                    <Box className={classes.SubFormLittleBox}>
                      <Field
                        id="Titre"
                        name="Titre"
                        type="text"
                        component={CostumTextField}
                      ></Field>
                    </Box>
                  </Box>

                  <Divider />

                  <Box className={classes.FormLittleBox} padding={3}>
                    <Box className={classes.SubFormLittleBox}>
                      <Typography variant="h6">Description</Typography>
                      <ErrorMessage name="Description" component={TextError} />
                    </Box>
                    <Box className={classes.SubFormLittleBox}>
                      <Field
                        id="Description"
                        name="Description"
                        type="text"
                        component={CostumTextFieldDescription}
                      ></Field>
                    </Box>
                  </Box>

                  <Divider />
                </Box>

                <Box height={25}></Box>

                <Box className={classes.BoxShadow}>
                  <Box className={classes.FormLittleBox} padding={3}>
                    <Box className={classes.SubFormLittleBox}>
                      <Typography variant="h6">Catalogue</Typography>
                      <ErrorMessage
                        name="Catalogue"
                        component={TextError}
                      ></ErrorMessage>
                    </Box>
                    <Box className={classes.SubFormLittleBox}>
                      <Field
                        name="Catalogue"
                        as="checkbox"
                        id="Catalogue"
                        mobile={typeOfInput()}
                        size={size}
                        setSize={setSize}
                        component={DropDownItem}
                      ></Field>
                    </Box>
                  </Box>

                  <Divider />

                  <Box className={classes.FormLittleBox} padding={3}>
                    <Box className={classes.SubFormLittleBox}>
                      <Typography variant="h6">Marque</Typography>
                      <ErrorMessage
                        name="Brand"
                        component={TextError}
                      ></ErrorMessage>
                    </Box>
                    <Box className={classes.SubFormLittleBox}>
                      <Field
                        name="Brand"
                        id="Brand"
                        mobile={typeOfInput()}
                        component={BrandForm}
                      ></Field>
                    </Box>
                  </Box>
                  <Divider />

                  {size ? (
                    <Box>
                      <Box className={classes.FormLittleBox} padding={3}>
                        <Box className={classes.SubFormLittleBox}>
                          <Typography variant="h6">Taille</Typography>
                          <ErrorMessage
                            name="Size"
                            component={TextError}
                          ></ErrorMessage>
                        </Box>
                        <Box className={classes.SubFormLittleBox}>
                          <Field
                            id="Size"
                            name="Size"
                            size={size}
                            mobile={typeOfInput()}
                            component={SizeForm}
                          ></Field>
                        </Box>
                      </Box>
                      <Divider />

                      <Box className={classes.FormLittleBox} padding={3}>
                        <Box className={classes.SubFormLittleBox}>
                          <Typography variant="h6">Couleurs</Typography>
                          <ErrorMessage
                            name="Color"
                            component={TextError}
                          ></ErrorMessage>
                        </Box>
                        <Box className={classes.SubFormLittleBox}>
                          <Field
                            id="Color"
                            name="Color"
                            mobile={typeOfInput()}
                            component={ColorForm}
                          ></Field>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ) : null}
                  <Box className={classes.FormLittleBox} padding={3}>
                    <Box className={classes.SubFormLittleBox}>
                      <Typography variant="h6">Etat</Typography>
                      <ErrorMessage
                        name="State"
                        component={TextError}
                      ></ErrorMessage>
                    </Box>
                    <Box className={classes.SubFormLittleBox}>
                      <Field
                        name="State"
                        id="State"
                        mobile={typeOfInput}
                        component={StateForm}
                      ></Field>
                    </Box>
                  </Box>
                  <Divider />
                </Box>

                <Box height={25}></Box>

                <Box className={classes.BoxShadow}>
                  <Box className={classes.FormLittleBox} padding={3}>
                    <Box className={classes.SubFormLittleBox}>
                      <Typography variant="h6">Prix</Typography>
                      <ErrorMessage name="Price" component={TextError} />
                    </Box>
                    <Box className={classes.SubFormLittleBox}>
                      <Field
                        name="Price"
                        id="Price"
                        component={CostumPriceField}
                      ></Field>
                    </Box>
                  </Box>
                </Box>

                <Box height={25}></Box>

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    style={{ color: "white" }}
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    {!edit ? "Ajouter" : "Sauvegarder les changements"}
                  </Button>
                </Box>

                <Box height={200}></Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ItemForm;
