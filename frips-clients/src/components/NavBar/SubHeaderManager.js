import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import SubHeaderNavigation from "./SubHeaderNavigation";

const useStyles = makeStyles((theme) => ({
  fakeBox: {
    cursor: "pointer",
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,

    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },
}));

const transformStringToUrl = (string) => {
  return string
    .replaceAll(" ", "-")
    .replaceAll("&", "and")
    .replaceAll(" et ", "and");
};

const SubHeaderManager = () => {
  return (
    <Box
      width={"100%"}
      style={{ backgroundColor:"rgba(205, 217, 231,0.8)" }}
      height={50}
      margin="auto"
      display="flex"
      alignItems="center"
      
    >
      <SubHeaderNavigation
        category={0}
        name={"Femme"}

        transformStringToUrl={transformStringToUrl}
      />
      <SubHeaderNavigation
        category={1}
        name={"Homme"}
        transformStringToUrl={transformStringToUrl}
      />
    </Box>
  );
};

export default SubHeaderManager;
