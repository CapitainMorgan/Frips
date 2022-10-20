import { Box, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";

const RegroupByDate = ({ itemDate }) => {
  console.log(itemDate)
  return (
    <Box width="100%" height={25} display="flex" justifyContent="center">
      <Typography>{itemDate}</Typography>
      {itemDate = null}
    </Box>
    
  );
};

export default RegroupByDate;
