import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  DragItem: {
    padding: 3,
    width: 200,
    height: 200,
  },
  Container: {
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

export const ConditionGeneral = () => {
  const classes = useStyles();
  return (
    <Box className={classes.Container}>
      <Box>condition général de vente</Box>
    </Box>
  );
};

export default ConditionGeneral;
