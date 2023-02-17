import React, { useEffect } from "react";

import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_ENDPOINT from "../../api/url";

const useStyles = makeStyles((theme) => ({
  progressBarStyle: {
    backgroundColor: "red",
  },
}));

const clearWaitingQueue = () => {
  // Easy, right 😎
  toast.clearWaitingQueue();
};

const notify = (notification) => {
  toast.info(
    <Box fontSize={16} display="flex" alignItems={"center"}>
      <Box
        style={{ width: "25%" }}
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
      >
        <Avatar
          alt={`${API_ENDPOINT}/${notification.Pseudo}`}
          src={`${API_ENDPOINT}/imageProfile/${notification.id_Sender}/${notification.imageSender?.image}`}
        />
      </Box>

      <Box width={"100%"} justifyContent={"center"} display="flex">
        <Typography>
          {`Pseudo t'as envoyé un nouveau `}
          <Link
            to={`/member/message/${notification.id_Chat}`}
            style={{ color: "#82A0C2" }}
          >
            message
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

const NotificationComponent = ({ notification ,mobile}) => {
  const classes = useStyles();

  useEffect(() => {
    if (notification !== null &&!mobile) {
      notify(notification);
    }
  }, [notification]);
  return (
    <div>
      <ToastContainer
        autoClose={2000}
        newestOnTop={true}
        style={{
          width: "30%",
        }}
        progressStyle={{ backgroundColor: "#82A0C2" }}
        icon={<MailOutlineIcon color="primary" />}
      />
    </div>
  );
};

export default NotificationComponent;
