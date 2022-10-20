import {
  Box,
  Divider, makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import "moment/locale/fr";
import React, {
  useEffect, useState
} from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addMessage,
  getConv,
  getItemForPropse, readMessage, sendMessage
} from "../../actions";
import ListForPropose from "./CostumItem/DialogForPropose";
import MessageComponent from "./renderMessageComponent";

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
    maxHeight: 300,
    overflow: "auto",
    flexDirection: "column",
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

const Conversation = ({
  match,
  conv,
  userId,
  Profile,
  socket,
  imageSender,
}) => {
  const classes = useStyles();
  let { id } = useParams();
  id = parseInt(id);
  const dispatch = useDispatch();
  const [Message, setMessage] = useState({ text: "", chat_id: id });
  console.log(id);

  useEffect(() => {
    dispatch(getConv(id));
    dispatch(readMessage(id))
  }, [dispatch]);

  useEffect(() => {
    if (Profile) {
      dispatch(getItemForPropse(renderProfileNumber(Profile, userId)));
    }
  }, [dispatch, Profile]);


  useEffect(() => {
    if (socket?.connected) {
      socket.emit("join room", id);

      socket.on("message received", (text) => {
        dispatch(addMessage(text));
      });

      return () => {
        socket.emit("unsubscribe", id);
      };
    }
  }, [socket]);

  const onChange = (e) => {
    setMessage({ ...Message, text: e.target.value });
  };

  if (!conv || (conv && conv.Profile.length === 0)) {
    return <Box minHeight={"100vh"} width={"100%"} style={{ backgroundColor: "#F5f5f3" }}></Box>;
  }

  const id_Receiver = () => {
    if (Profile.Profile1.ProfileNumber !== userId) {
      return Profile.Profile1.ProfileNumber;
    }
    if (Profile.Profile2.ProfileNumber !== userId) {
      return Profile.Profile2.ProfileNumber;
    }
  };

  return (
    <Box minHeight={"100vh"} style={{ backgroundColor: "#F5f5f3" }}>
      <Box height="10vh" />
      <Box className={classes.formContainer}>
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
            justifyContent="center"
          >
            <Typography style={{ fontSize: "1.2em" }}>
              {renderProfileName(Profile, userId)}
            </Typography>
          </Box>
          <Divider />

          <MessageComponent />

          <Box
            style={{ backgroundColor: "white" }}
            flex={0.5}
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
                          id_Receiver(),
                          userId,
                          null,
                          null
                        )
                      );
                      setMessage({ text: "", chat_id: id, id });

                      const data = {
                        Message,
                        id_Sender: userId,
                        id_Receiver: id_Receiver(),
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
                <ListForPropose id={id} socket={socket} />
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
