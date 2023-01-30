import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import { sendMessage } from "../../actions";
const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: "pointer",
    fontSize: "1.8em",
  },
  BoxItem: (props) => ({
    "&:hover": {
      background: props.hoverColor,
    },
  }),
  Typography: {
    fontWeight: 500,
    fontSize: 18,
  },
  IconColor: {
    position: "absolute",
    right: 10,
  },
  Dialog: {
    overflow: "hidden",
    width: 600,
  },
  GridSytem: {
    display: "grid",
    padding: 1,
    overflow: "auto",
    gridTemplateColumns: "repeat(3,33%)",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2,50%)",
    },
  },

  BoxOneItem: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 2,
    width: 400,
    margin: "auto",
    borderRadius: 6,
  },
}));

const loadingSendProposition = (succeed, loading) => {
  if (loading) {
    return <CircularProgress size={28} />;
  }
  if (succeed === 1) {
    return <DoneIcon />;
  }
  if (succeed === 2) {
    return (
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 14, color: "black" }}>
          Oups il semblerait que vous ayez déjà soumis une offre
        </Typography>
      </Box>
    );
  } else {
    return <Typography style={{ fontSize: 14 }}>Faire une offre</Typography>;
  }
};

const displayColor = (succeed, loading) => {
  if (succeed === 0) {
    return "#82A0C2";
  }
  if (succeed === 1) {
    return "green";
  }
  if (succeed === 2) {
    return "red";
  }
};

const PricePropose = ({
  item,
  anchorEl,
  imageSender,
  Profile,
  Message,
  userId,
  id_Receiver,
  chat_id,
  itemId,
  handleClickAway,
  itemPrice,
  socket,
}) => {
  const classes = useStyles();
  const [Price, setPrice] = useState("");
  const [succeed, SetSucceed] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (!isNaN(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const sendProposition = async (Price, idItem) => {
    alert(Price)
    try {
      setLoading(true);
      const succeed = await axios.post(`/api/items/proposition`, {
        Price,
        idItem,
      });
      if (succeed) {
        SetSucceed(1);
        setLoading(false);

        setTimeout(() => {
          handleClickAway();
        }, 2000);
      }
    } catch (error) {
      setLoading(false);

      SetSucceed(2);
      setTimeout(() => {
        handleClickAway();
      }, 4000);
    }
  };

  return (
    <Modal
      open={anchorEl}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      aria-labelledby="simple-modal-price"
      aria-describedby="simple-modal-price"
    >
      <Box className={classes.BoxOneItem}>
        <Box display={"flex"} flexDirection="column" padding={2}>
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            position={"relative"}
          >
            <Typography style={{ fontSize: 18 }}>Faire une offre</Typography>
            <Box display={"flex"} position="absolute" right={0}>
              <CloseIcon
                className={classes.pointer}
                onClick={handleClickAway}
              />
            </Box>
          </Box>
          <Box height={10} />

          <TextField
            placeholder={`${itemPrice} CHF`}
            value={Price}
            disabled={succeed === 2}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {Price ? "CHF" : null}
                </InputAdornment>
              ),
              max: 10,
              style: {
                width: "100%",
                fontSize: 18,
              },
            }}
            onChange={handleChange}
            fullWidth
          />
          <Box height={10} />
          <Button
            style={{
              width: "100%",
              marginTop: 5,
              backgroundColor: displayColor(succeed),
            }}
            variant="contained"
            disabled={loading || succeed === 2}
            onClick={async () => {
              if (item) {
                if (socket?.connected) {
                  dispatch(
                    sendMessage(
                      "",
                      chat_id,
                      id_Receiver(Profile, userId),
                      userId,
                      item,
                      Price
                    )
                  );

                  const data = {
                    Message: "",
                    id_Sender: userId,
                    id_Receiver: id_Receiver(Profile, userId),
                    id: chat_id,
                    Profile: [
                      Profile.Profile2.ProfileNumber,
                      Profile.Profile1.ProfileNumber,
                    ],
                    date: new Date(),
                    item,
                    Price,
                    imageSender: imageSender?.image ? imageSender : null,
                  };

                  socket.emit("new message", data);
                }
              } else {
                sendProposition(Price, itemId);
              }
            }}
          >
            {loadingSendProposition(succeed, loading)}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PricePropose;
