import {
    Box, Dialog,
    makeStyles,
    Typography
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import PaymentIcon from "@material-ui/icons/Payment";
import React, { useState } from "react";

import { Fab, IconButton } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import FacebookIcon from "@material-ui/icons/Facebook";
import HelpIcon from "@material-ui/icons/Help";
import InstagramIcon from "@material-ui/icons/Instagram";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  ItemAide: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 3,
    cursor: "pointer",

    height: 200,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%%",
      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
  Dialog: {
    width: 350,
    height: 500,
    [theme.breakpoints.down("sm")]: {
      height: 500,
      width: "auto",
    },
  },

  Container: {
    boxSizing: "border-box",
    width: 800,
    margin: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
      padding: 20,
    },
  },

  SubContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gridRowGap: 50,
    gridColumnGap: 20,

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
    },
  },
}));

export const Aide = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const handleClick = (e) => {
    setOpen(true);
  };

  const SelectableItem = (e) => {
    setOpen(false);
  };
  return (
    <Box width={"100%"} height={"100%"} style={{ backgroundColor: "#F5f5f3" }}>
      <Box height={50} />
      <Box
        style={{ backgroundColor: "#82A0C2" }}
        width={"100%"}
        margin="auto"
        alignItems="center"
        height={50}
        display="flex"
        justifyContent="center"
      >
        <Typography style={{ fontSize: 16 }}>
          Ce que tu cherches se trouve peut-être ici !
        </Typography>
        <Box alignItems="center" display="flex" padding={3}>
          <EmojiEmotionsIcon color="primary" />
        </Box>
      </Box>
      <Box className={classes.Container}>
        <Box height={"10vh"} />

        <Box className={classes.SubContainer}>
          <Box height={"100%"}>
            <Box
              position="relative"
              className={classes.ItemAide}
              onClick={() => history("/Aide/urAccount")}
            >
              <Box
                margin="auto"
                display="flex"
                bgcolor="white"
                justifyContent="center"
                height={50}
              >
                <Box
                  position="absolute"
                  top={-35}
                  borderRadius={"100%"}
                  bgcolor="#82A0C2"
                  width={80}
                  height={80}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width={"100%"}
                  >
                    <AccountBoxIcon
                      style={{ fontSize: "4em", color: "white" }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                height={"100%"}
                width={"100%"}
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box>
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    Votre Compte
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  width="100%"
                  height={"100%"}
                  flexWrap="wrap"
                >
                  <Box
                    marginTop={1}
                    paddingLeft={2}
                    paddingRight={2}
                    height={"100%"}
                  >
                    <Typography style={{ fontSize: "1.2em" }}>
                      Comment Changer son mot de passe ou utilisateur ? Modifier
                      sa photo de profil ? Ajouter une adresse de livraison ?
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box height={"100%"}>
            <Box
              position="relative"
              className={classes.ItemAide}
              onClick={() => history("/Aide/paiement")}
            >
              <Box
                margin="auto"
                display="flex"
                bgcolor="white"
                justifyContent="center"
                height={50}
              >
                <Box
                  position="absolute"
                  top={-35}
                  borderRadius={"100%"}
                  bgcolor="#82A0C2"
                  width={80}
                  height={80}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width={"100%"}
                  >
                    <PaymentIcon style={{ fontSize: "4em", color: "white" }} />
                  </Box>
                </Box>
              </Box>

              <Box
                height="100%"
                width={"100%"}
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box>
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    Paiement
                  </Typography>
                </Box>
                <Box
                  display="inline-block"
                  width="100%"
                  height={"100%"}
                  flexWrap="wrap"
                >
                  <Box marginTop={1} paddingLeft={2} paddingRight={2}>
                    <Typography style={{ fontSize: "1.2em" }}>
                      Le paiement est-il sécurisé ? Pourquoi j'ai des frais ?
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box height="100%">
            <Box
              position="relative"
              className={classes.ItemAide}
              onClick={() => history("/Aide/vendre")}
            >
              <Box
                margin="auto"
                display="flex"
                bgcolor="white"
                justifyContent="center"
                height={50}
              >
                <Box
                  position="absolute"
                  top={-35}
                  borderRadius={"100%"}
                  bgcolor="#82A0C2"
                  width={80}
                  height={80}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width={"100%"}
                  >
                    <AttachMoneyIcon
                      style={{ fontSize: "4em", color: "white" }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                width={"100%"}
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box>
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    Vendre
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  width="100%"
                  height={"100%"}
                  flexWrap="wrap"
                >
                  <Box
                    marginTop={1}
                    height={"100%"}
                    paddingLeft={2}
                    paddingRight
                  >
                    <Typography style={{ fontSize: "1.2em" }}>
                      Comment vendre rapidement ? Comment créer une réduction ?
                      Comment bien présenter des produits ?
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box
              position="relative"
              className={classes.ItemAide}
              onClick={() => history("/Aide/acheter")}
            >
              <Box
                margin="auto"
                display="flex"
                bgcolor="white"
                justifyContent="center"
                height={50}
              >
                <Box
                  position="absolute"
                  top={-35}
                  borderRadius={"100%"}
                  bgcolor="#82A0C2"
                  width={80}
                  height={80}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    width={"100%"}
                  >
                    <AddShoppingCartIcon
                      style={{ fontSize: "4em", color: "white" }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                height={40}
                width={"100%"}
                padding={3}
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box>
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    Acheter
                  </Typography>
                </Box>
                <Box
                  display="inline-block"
                  width="100%"
                  height={"100%"}
                  flexWrap="wrap"
                >
                  <Box marginTop={1} paddingLeft={2} paddingRight={2}>
                    <Typography style={{ fontSize: "1.2em" }}>
                      Comment négocier ? Comment vous protéger ?
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box position="fixed" bottom={0} right={0} padding={3}>
          <Fab aria-label="Nous joindre?" onClick={handleClick}>
            <HelpIcon color="primary" style={{ fontSize: "3em" }} />
          </Fab>
          <Dialog open={open}>
            <Box
              className={classes.Dialog}
              display="flex"
              flexDirection="column"
            >
              <Box position="absolute" top={0} right={0} padding={2}>
                <IconButton
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon />{" "}
                </IconButton>
              </Box>

              <Box padding={3}>
                <Box marginTop={5}>
                  <Typography>
                    Tu as un problème ou tu souhaites nous joindre pour x raison
                    pas de soucis nous sommes là pour toi !
                  </Typography>
                </Box>
                <Box marginTop={2}>
                  <Typography>
                    Tu peux nous joindre sur nos réseaux ci-dessous
                  </Typography>
                </Box>

                <Box marginTop={2} display="flex" justifyContent="center">
                  <Box>
                    <IconButton>
                      <InstagramIcon style={{ fontSize: "1.8em" }} />{" "}
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton>
                      <FacebookIcon style={{ fontSize: "1.8em" }} />{" "}
                    </IconButton>
                  </Box>
                </Box>
                <Box marginTop={2}>
                  <Box>
                    <Typography>
                      Tu peux aussi nous joindre sur via cette adresse mail
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" marginTop={2}>
                    <Typography style={{ fontSize: "2em", color: "blue" }}>
                      wati@gmail.com
                    </Typography>
                  </Box>
                </Box>

                <Box marginTop={2}>
                  <Box>
                    <Typography>
                      Nous prenons vraiment le temps de répondre à toute
                      question donc n'hésite pas
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Dialog>
        </Box>

        <Box height={"20vh"} />
      </Box>
    </Box>
  );
};

export default Aide;
