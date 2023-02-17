import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Icon,
  makeStyles,
  MenuItem,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AdjustOutlinedIcon from "@material-ui/icons/AdjustOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import moment from "moment";
import "moment/locale/de";
import "moment/locale/fr";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllConv } from "../../actions";
import API_ENDPOINT from "../../api/url";
const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: "1%",
  },
  Divider: {
    height: "5vh",
    [theme.breakpoints.down("sm")]: {
      height: 0,
    },
  },

  formContainer: {
    marginBottom: "5vh",
    height: "60vh",
    overflow: "auto",
    margin: "auto",
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
      width: "100%",

      marginBottom: 0,
      height: "calc(100vh - 98px)",
    },
  },
}));

const renderAvatarUrl = (
  { account_accountTochat_id_Account_2, account_accountTochat_id_Account_1 },
  userId
) => {
  console.log(account_accountTochat_id_Account_2)
  if (account_accountTochat_id_Account_2.id === userId) {
    return `${account_accountTochat_id_Account_1.id}/${account_accountTochat_id_Account_1?.image?.image}`;
  } else if (account_accountTochat_id_Account_1.id === userId) {
    return `${account_accountTochat_id_Account_2.id}/${account_accountTochat_id_Account_2?.image?.image}`;
  }
};

const renderPseudo = ({ account_accountTochat_id_Account_2, account_accountTochat_id_Account_1 },
  userId) =>{
    if(account_accountTochat_id_Account_2.id === userId){
      return `${account_accountTochat_id_Account_1.Pseudo}`
    }
    else{
      return `${account_accountTochat_id_Account_1.Pseudo}`

    }
  }

const UserMessage = (messages, classes, history, idUser) => {
  return messages.map((item, index) => {
    console.log(item.message[0].Unread && idUser !== item.message[0].id_Sender);
    return (
      <Box className={classes.boxShadow} key={index}>
        <MenuItem
          key={index}
          className={classes.MenuSetting}
          onClick={() => {
            history(`/member/message/${item.id}`);
          }}
        >
          <Avatar
            alt={renderPseudo(item,idUser)}
            src={`${API_ENDPOINT}/imageProfile/${renderAvatarUrl(item,idUser)}`}
          />

          <Box display="flex" paddingLeft={2} flexGrow={1} width="100%">
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
                <Box display={"flex"} alignItems={"center"}>
                  {item.message[0].Unread &&
                  idUser !== item.message[0].id_Sender ? (
                    <Icon style={{ marginRight: "1vh" }}>
                      <AdjustOutlinedIcon color="primary" />
                    </Icon>
                  ) : null}
                  <Typography style={{ fontSize: 13 }}>
                    {moment(item.message[0].Date_Houre).fromNow()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </MenuItem>
      </Box>
    );
  });
};

const AllConversations = ({ conversations, loading, count, idUser }) => {
  const dispatch = useDispatch();

  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (conversations.length === 0 && !loading && count !== 0) {
      dispatch(getAllConv());
    }
  }, [dispatch, loading]);

  const classes = useStyles();

  if (conversations.length === 0 && loading) {
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
    <Box style={{ backgroundColor: "#F5f5f3" }}>
      <Box className={classes.Divider} />
      <Box className={classes.formContainer}>
        {!loading ? UserMessage(conversations, classes, history, idUser) : null}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  conversations: state.messageReducer.conversations,
  loading: state.messageReducer.loading,
  count: state.messageReducer.count,
  idUser: state.auth.user.id,
});

export default connect(mapStateToProps)(AllConversations);
