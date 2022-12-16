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
      style={{ backgroundColor: "white" }}
      height={50}
      margin="auto"
      display="flex"
      alignItems="center"
      paddingLeft={"10%"}
      paddingRight={"10%"}
    >
      <SubHeaderNavigation
        category={1}
        transformStringToUrl={transformStringToUrl}
      />
    </Box>
  );
};

export default SubHeaderManager;