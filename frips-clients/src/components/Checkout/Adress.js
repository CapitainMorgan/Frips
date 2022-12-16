import { Box, MenuItem, Typography } from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";

const Adress = ({ addresse }) => {
  const { Firstname, Lastname } = addresse;
  const { City, NPA, Street, NumStreet } = addresse?.address;

  if (!addresse?.address) {
    return (
      <MenuItem style={{ width: "100%", padding: 0, height: 50 }}>
        <Box flexGrow={1}>Ajouter une Adresse</Box>
        <Box>
          <AddIcon style={{ fontSize: 30 }} />
        </Box>
      </MenuItem>
    );
  }
  return (
    <Box display={"flex"} flexDirection="column" flexGrow={1}>
      <Typography
        style={{ fontSize: 16 }}
      >{`${Firstname} ${Lastname}`}</Typography>
      <Typography
        style={{ fontSize: 16 }}
      >{`${Street} ${NumStreet}`}</Typography>
      <Typography style={{ fontSize: 16 }}>{`${City} ${NPA}`}</Typography>
      <MenuItem style={{ width: "100%", padding: 0, height: 50 }}>
        <Box flexGrow={1}>Ajouter une autre Adresse de Livraison ?</Box>
        <Box>
          <AddIcon style={{ fontSize: 30 }} />
        </Box>
      </MenuItem>
    </Box>
  );
};

export default Adress;
