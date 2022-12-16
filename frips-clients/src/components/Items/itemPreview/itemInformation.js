import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Divider,
  Popover,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newConv } from "../../../actions";
import PricePropose from "../../Checkout/PricePropose";
const ItemInformation = ({ state, classes, flag, setFlag }) => {
  const history = useNavigate();
  const [star, setStar] = useState(4);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [favorite, setFavorite] = useState(null);



  const handleClick = () => {
    setAnchorEl(true);
  };

  const handleClickAway = () => {
    setAnchorEl(false);
  };

  const dispatch = useDispatch();


  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  if (!state?.Price) {
    return null;
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPoPover = Boolean(anchorEl);
  return (
    <Box height={"100%"}>
      <Box className={classes.floatContentProfil} position="relative">
        <Box
          display="flex"
          padding={2}
          width={"100%"}
          onClick={() => alert("nique toi")}
        >
          <Box display="flex" alignItems="center">
            <CardHeader style={{ padding: 0 }} avatar={<Avatar>S</Avatar>} />
            <Box display="block" position="relative">
              <Box display="flex">
                <Typography
                  aria-owns={openPoPover ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <VerifiedUserIcon color="primary" />
                </Typography>
                <Typography>{state.userName}</Typography>

             
              </Box>
              <Rating value={star} readOnly />
            </Box>
            <Box display="flex" position="absolute" right={0}>
              <NavigateNextIcon />
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          {/*faire boutton suivre ???? */}
        </Box>
      </Box>
      <Box className={classes.floatContentInformation}>
        <Box marginBottom={2}>
          <Typography style={{ fontSize: "1.5em" }}>
            {state.Price} CHF
          </Typography>
        </Box>

        <Box display="flex">
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16, color: "#999998" }}>
              Marque
            </Typography>
          </Box>

          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16 }}>
              {state.item_brand[0].brand.Name}
            </Typography>
          </Box>
        </Box>

        <Box display="flex">
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16, color: "#999998" }}>
              Taille
            </Typography>
          </Box>
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16 }}>{state.Size}</Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16, color: "#999998" }}>
              Etat
            </Typography>
          </Box>
          <Box className={classes.ContentInformationItem}>
            <Typography
              style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                fontSize: 16,
              }}
            >
              {state.itemcondition.Name}
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box className={classes.ContentInformationItem}>
            <Typography style={{ fontSize: 16, color: "#999998" }}>
              Couleur (s)
            </Typography>
          </Box>
          <Box className={classes.ContentInformationItem}>
            {state.item_brand === 1
              ? state.item_brand.color.Name
              : state.item_color.map((item, index) => {
                  if (index === 0) {
                    return (
                      <Typography style={{ fontSize: 16 }}>
                        {item.color.Name}
                      </Typography>
                    );
                  } else {
                    return (
                      <Typography style={{ fontSize: 16 }}>
                        {`   ${item.color.Name}`}
                      </Typography>
                    );
                  }
                })}
          </Box>
        </Box>
        <Box display="flex">
          <Box className={classes.ContentInformationItem}>Emplacement</Box>

          <Box className={classes.ContentInformationItem}>
            {state.Emplacement}
          </Box>
        </Box>
        <Box display="flex">
          <Box className={classes.ContentInformationItem}>
            Moyen de paiement
          </Box>
          <Box className={classes.ContentInformationItem}></Box>
        </Box>

        <Divider style={{ marginTop: 5 }} />

        <Box marginTop={2}>
          <Box height={"100%"}>
            <Box display="inline-block" lineHeight={2}>
              <Typography style={{ fontSize: 16, color: "#999998" }}>
                Description
              </Typography>
            </Box>

            <Box display="inline-block" width={"100%"}>
              <Typography style={{ wordWrap: "break-word", fontSize: 16 }}>
                {state.Description}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="outlined"
            style={{ width: "100%", marginTop: 5 }}
            onClick={() => {
              dispatch(newConv(state.id, state, history));
            }}
          >
            Envoyer un message
          </Button>


          <Button
            style={{ width: "100%", marginTop: 5 }}
            variant="contained"
            color="primary"
            onClick={() => history(`/payment/${state.id}`)}
          >
            Acheter
          </Button>

          <Button
            style={{ width: "100%", marginTop: 5 }}
            variant="outlined"
            color="primary"
            onClick={() => {
              handleClick();
            }}
          >
            Faire une offre
          </Button>
          {anchorEl ? (
            <PricePropose itemPrice={state.Price} idReceiver={state.account.id} itemId={state.id} handleClickAway={handleClickAway} anchorEl={anchorEl} />
          ) : null}

          <Button
            variant="outlined"
            style={{ width: "100%", marginTop: 5 }}
            onClick={() => {
              setFavorite(!favorite);
            }}
          >
            {!favorite ? (
              <Box display="flex" width={"100%"} justifyContent="center">
                <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>
                enlever des favoris
              </Box>
            ) : (
              <Box display="flex" justifyContent="center">
                <FavoriteBorderIcon
                  style={{ color: "grey" }}
                ></FavoriteBorderIcon>
                ajouter aux favoris
              </Box>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemInformation;
