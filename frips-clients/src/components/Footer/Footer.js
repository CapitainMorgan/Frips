import { Box, IconButton, MenuItem } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png";
export const Footer = () => {
  const history = useNavigate();
  return (
    <Box
      width={"100%"}
      position="aboslute"
      bottom={0}
      display={"flex"}
      style={{ backgroundColor: "#82A0C2" }}
    >
      <Box margin="auto" display="flex" alignItems="center" height={100}>
        
        <Box>
          <MenuItem
            onClick={() => history("/Condition-général-de-vente-et-politique")}
          >
            CG
          </MenuItem>
        </Box>
        <Box>
          <MenuItem onClick={() => history("/Aide")}>Aide</MenuItem>
        </Box>
        
        <Box>
          <IconButton>
            <InstagramIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
