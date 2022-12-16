import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import "moment/locale/fr";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  addMessage,
  getConv,
  getItemForPropse,
  readMessage,
  receivedNewMessage,
  sendMessage,
} from "../../actions";
import ListForPropose from "./CostumItem/DialogForPropose";
import MessageComponent from "./renderMessageComponent";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SecondPageDialog from "./CostumItem/SecondPageDialog";
import { isNumber } from "lodash";
const useStyles = makeStyles((theme) => ({
  MenuSetting: {
    height: 65,
    width: "100%",
    display: "flex",
    position: "relative",
  },
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    width: "70%",
    display: "flex",
    flexDirection: "column",
    padding: 12,
    margin: "auto",
    flex: 3,
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
    },
  },

  Header: {
    fontSize: 16,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },

  MessageBox: {
    position: "relative",
    flex: 10,
    display: "flex",
    height: 300,
    overflow: "auto",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      height:"100%" ,

    },
  },
  container: {
    flexGrow:1,
    [theme.breakpoints.down("sm")]: {
      height:"100%" ,

    },
  },
}));

const renderProfileName = (Profile, userId) => {
  if (!Profile) return;

  if (Profile.Profile1.ProfileNumber === userId) {
    return Profile.Profile2.ProfileName;
  } else {
    return Profile.Profile1.ProfileName;
  }
};

const renderProfileNumber = (Profile, userId) => {
  if (!Profile) return;
  if (Profile.Profile1.ProfileNumber === userId) {
    return Profile.Profile2.ProfileNumber;
  } else {
    return Profile.Profile1.ProfileNumber;
  }
};

const id_Receiver = (Profile, userId) => {
  if (Profile.Profile1.ProfileNumber !== userId) {
    return Profile.Profile1.ProfileNumber;
  }
  if (Profile.Profile2.ProfileNumber !== userId) {
    return Profile.Profile2.ProfileNumber;
  }
};

const Conversation = ({
  conv,
  loading,
  userId,
  newMessage,
  Profile,
  socket,
  imageSender,
}) => {
  const classes = useStyles();
  let { id } = useParams();
  id = parseInt(id);
  const dispatch = useDispatch();
  const [Message, setMessage] = useState({ text: "", chat_id: id });
  const [receivedMessage, setReceivedMessage] = useState(false);
  const [isBottom, setIsBottom] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const history = useNavigate()
  const fromItem = useLocation().state
  
  console.log(fromItem)

  useEffect(() => {
    if (socket?.connected) {
      socket.emit("join room", id);

      socket.on("message received", (text) => {
        dispatch(receivedNewMessage(true));
        dispatch(addMessage(text));
      });

      return () => {
        socket.emit("unsubscribe", id);
        socket.off("message received");
        socket.off("new message");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (isNumber(id)) {
      dispatch(getConv(id));
      dispatch(readMessage(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isBottom) {
      dispatch(receivedNewMessage(false));
    }
  }, [newMessage]);

  useEffect(() => {
    if (Profile) {
      dispatch(getItemForPropse(renderProfileNumber(Profile, userId)));
    }
  }, [dispatch, Profile]);

  const onChange = (e) => {
    setMessage({ ...Message, text: e.target.value });
  };

  if (loading || !conv) {
    return (
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
        width="100%"
        height="100vh"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box  style={{ backgroundColor: "#F5f5f3" }}>
      <Box height="10vh" />
      <Box className={classes.container}>
        <Box
          className={classes.boxShadow}
          minHeight="70vh"
          position="relative"
          flex={3}
          flexDirection="column"
          display="flex"
        >
          <Box
            className={classes.MenuSetting}
            display="flex"
            alignItems="center"
          >
          <Avatar
            style={{ marginRight: 10 }}
          />
            <Typography style={{ fontSize: "1.2em" }} >
              {renderProfileName(Profile, userId)}
            </Typography>
            
          </Box>
          <Divider />

          {fromItem ? <React.Fragment>
          <Box display={"flex"} padding={3}>
                <Box
                style={{height:50,width:50}}
                  
                  onClick={() => {
                    history(`/items/${fromItem.id}`);
                  }}
                >
                  <img
                      alt={`/images/${fromItem.id}/${fromItem.image[0].image}`}
                    src={`/images/${fromItem.id}/${fromItem.image[0].image}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  marginLeft={3}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent="center"
                >
                  <Typography style={{ fontSize: 16 }}>{fromItem.Name}</Typography>
                  <Typography style={{ fontSize: 16 }}>
                    {fromItem.Size} · {fromItem.item_brand[0].brand.Name}
                  </Typography>
                </Box>
              </Box>
         
          
          <Divider /> 
          </React.Fragment>
          :null}

          <Box flex={1}>
          <MessageComponent
            isBottom={isBottom}
            setIsBottom={setIsBottom}
            receivedMessage={receivedMessage}
            setReceiveNewMessage={setReceivedMessage}
            setIsAccepted={setIsAccepted}
            isAccepted={isAccepted}
          />
          </Box>
          {newMessage && !isBottom ? (
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              height={50}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setIsAccepted(true);
                }}
              >
                <MailOutlineIcon />
                nouveau message
              </Button>
            </Box>
          ) : null}

          <Box
            style={{ backgroundColor: "white" }}
            flex={0.25}
            display="flex"
            width="100%"
            borderTop={1}
            borderColor="#E0E0E0"
            padding={2}
            alignItems="center"
            height="20%"
            justifyContent="center"
          >
            <Box
              display="flex"
              width="90%"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                fullWidth
                type="submit"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && Message.text.trim()) {
                    if (socket?.connected) {
                      dispatch(
                        sendMessage(
                          Message.text,
                          Message.chat_id,
                          id_Receiver(Profile, userId),
                          userId,
                          null,
                          null
                        )
                      );
                      setMessage({ text: "", chat_id: id, id });

                      const data = {
                        Message,
                        id_Sender: userId,
                        id_Receiver: id_Receiver(Profile, userId),
                        id: id,
                        Profile: [
                          Profile.Profile2.ProfileNumber,
                          Profile.Profile1.ProfileNumber,
                        ],
                        date: new Date(),
                        item: null,
                        Price: null,
                        imageSender: imageSender?.image ? imageSender : null,
                      };

                      socket.emit("new message", data);
                    }
                    e.preventDefault();
                  }
                }}
                value={Message.text}
                multiline={true}
                onChange={onChange}
                inputProps={{
                  style: { fontSize: 16, maxHeight: "5vh" },
                }}
              />

              <Box
                display="flex"
                alignItems="center"
                width="20%"
                justifyContent="center"
                padding={2}
              >
                <SecondPageDialog id={id} socket={socket} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  conv: state.messageReducer.openConversation,
  userId: state.auth.user?.id,
  socket: state.auth.socket,
  loading: state.messageReducer.loading,
  loaded: state.messageReducer.loaded,
  newMessage: state.messageReducer.newMessage,
  imageSender: state.auth.user?.image,
  Profile: state.messageReducer?.Profile,
  message: state.messageReducer.message,
  sendPropose: state.messageReducer.sendPropose,
  item: state.messageReducer.item,
});

export default connect(mapStateToProps)(Conversation);
