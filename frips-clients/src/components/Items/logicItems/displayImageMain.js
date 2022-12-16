import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import image from "../../../img/kaylin-pacheco-5ToyvEJIny8-unsplash (1).jpg";

const DisplayMain = ({ classes, loaded }) => {
  return (
    <Box className={classes.floatImage}>
      {true ? (
        <Box width={"100%"} height={"100%"} position="relative">
          <img
          key={image}
          alt={image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={image}
          ></img>
          <Box height={"10vh"} />
          <Box className={classes.boxShadow}>
            <Box display="inline-block" padding={2}>
              <Box>
                <Typography style={{ fontSize: 30, fontWeight: 500 }}>
                  Prêts à rejoindre la communauté ?
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                marginTop={2}
                height={50}
              >
                <Button disableElevation variant="contained" color="primary">
                  <Typography style={{ color: "white" }}>
                    Commencer à vendre
                  </Typography>
                </Button>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                marginTop={2}
                marginBottom={2}
              >
                <Button disableElevation variant="outlined" color="primary">
                  <Typography style={{ fontSize: 13 }}>
                    Commencer ça marche
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default DisplayMain;
