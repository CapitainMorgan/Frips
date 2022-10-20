import React, { useEffect } from "react";

import { Avatar, Box, Button, makeStyles, Typography } from "@material-ui/core";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import { ToastContainer, toast } from "react-toastify";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
          src={`/imageProfile/${notification.id_Sender}/${notification.imageSender}`}
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

const NotificationComponent = ({ notification }) => {
  const classes = useStyles();
  console.log(notification);

  useEffect(() => {
    if (notification !== null) {
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
