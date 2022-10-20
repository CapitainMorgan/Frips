import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Icon,
    makeStyles,
    MenuItem,
    Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AdjustOutlinedIcon from "@material-ui/icons/AdjustOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import moment from "moment";
import "moment/locale/de";
import "moment/locale/fr";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllConv } from "../../actions";
const useStyles = makeStyles((theme) => ({
  FormLittleBox: {
    display: "flex",
    flexWrap: "wrap",
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  SubFormLittleBox: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    flexWrap: "wrap",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justifyContent: "center",
      fontSize: 16,
      padding: 5,
    },
  },
  MenuSetting: {
    height: 65,
    width: "100%",
    display: "flex",
    position: "relative",
  },
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    padding: 12,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      width: "100%",
      padding: 0,
    },
  },
  Spacer: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "column",
  },
  Header: {
    fontSize: 16,
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  Dialog: {
    width: 400,
    height: 600,
    [theme.breakpoints.down("sm")]: {
      height: 500,
      width: "auto",
    },
  },
  formContainer: {
    boxSizing: "border-box",
    width: 1000,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "auto",

      left: "auto",
      right: "auto",
    },
  },
}));
/* 

return  messages.map((item,index) =>{
         
          
          return (
            <Box display="flex" width="100%" marginTop={1}>
            <MenuItem className={classes.MenuSetting} onClick={()=>{
            history.push(`/member/message/${index}`)

            }}>
                <Avatar/>
              <Box display="flex" flexDirection="column" paddingLeft={2}>
            <Box>
                {item.pseudo}
            </Box>
            <Box display="flex" flexWrap="wrap" width={500}>
                <Typography style={{textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",overflow:"hidden"}}>
                    {item.message}
                </Typography>
            </Box>
            <Box position="absolute" top={0} right={0} padding={1}>
                <Typography style={{fontSize:13}}>
                il y a x minute
                </Typography>
            </Box>
            <Box position="absolute" bottom={0} right={0} padding={1}>
            </Box>
        </Box>

              </MenuItem>
              </Box>
            
          )
      })*/

const UserMessage = (messages, classes, history,idUser) => {
  return messages.map((item,index) => {
    return (
      <Box display="flex" width="100%" marginTop={1}>
        <MenuItem
        key={index}
          className={classes.MenuSetting}
          onClick={() => {
            history(`/member/message/${item.id}`);
          }}
        >
          <Avatar />
          <Box display="flex" paddingLeft={2} flexGrow={1} width="100%">
            <Box>{item.pseudo}</Box>
            <Box display="flex" flexGrow={1} width="100%">
              <Typography
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "calc(20%)",
                }}
              >
                {item.message[0]?.Text ? (
                  item.message[0].Text
                ) : (
                  <Box display={"flex"}>
                    <AttachMoneyIcon style={{ color: "#228D57" }} />
                    <Typography style={{ fontSize: 16 }}>
                      Tu as une proposition d'offre ?
                    </Typography>
                    <AttachMoneyIcon style={{ color: "#228D57" }} />
                  </Box>
                )}
              </Typography>
              <Box flexGrow={1} justifyContent="flex-end" display={"flex"}>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography style={{ fontSize: 13 }}>
                    {moment(item.Date_Hour).local().format("LL")}
                  </Typography>
                  {item.message[0].Unread && idUser.id !== item.message[0].id_Sender ? (
                    <Icon>
                      <AdjustOutlinedIcon color="primary" />
                    </Icon>
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Box>
        </MenuItem>
      </Box>
    );
  });
};

const AllConversations = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.messageReducer);
  const idUser = useSelector(state => state.auth.user)
  const history = useNavigate();
    console.log(idUser)
  useEffect(() => {
    dispatch(getAllConv());
  }, [dispatch]);

  const classes = useStyles();

  if (!conversations && conversations && conversations.conversations) {
    return (
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor: "#F5f5f3" }} height="100vh">
      <Box height={100}></Box>
      <Box className={classes.formContainer}>
        <Box className={classes.boxShadow} maxHeight={600}>
          <Box>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Envoyer un nouveau message
            </Button>
          </Box>
          {conversations.conversations.length !== 0
            ? UserMessage(conversations.conversations, classes, history,idUser)
            : null}
        </Box>
      </Box>
    </Box>
  );
};

export default AllConversations;
