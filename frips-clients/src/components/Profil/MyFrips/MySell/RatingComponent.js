import { Box, Button, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useState } from "react";

const RatingComponent = ({ Pseudo }) => {
  const [value, setValue] = useState(0);

  return (
    <Box
      marginTop={10}
      marginBottom={10}
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      flexDirection="column"
      height={50}
    >
      <Typography style={{ fontSize: 16 }}>
        Évalue ta satisfaction de {Pseudo}
      </Typography>

      <Box display={"flex"} flexDirection="column" marginTop={2}>
        <Rating
          size="large"
          name="rating"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <Button
        onClick={() => {
          alert(value);
        }}
        color="Primary"
        style={{ fontSize: 13, marginTop: 20, width: "25%" }}
        variant="outlined"
      >
        Evaluer
      </Button>
    </Box>
  );
};

export default RatingComponent;
