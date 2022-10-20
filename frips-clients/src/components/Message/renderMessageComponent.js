import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import moment from "moment";
import "moment/locale/fr";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { getMoreMessage } from "../../actions";
import Message from "./Message";
import RegroupByDate from "./RegroupByDate";

import { connect } from "react-redux";
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
    width: "80%",
    display: "flex",
    flexDirection: "column",
    padding: 12,
    margin: "auto",
    flex: 3,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
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
    flex: 2,
    display: "flex",
    maxHeight: 300,
    overflow: "auto",
    flexDirection: "column-reverse",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
  },
}));
let previous;

const helpRegroupDateWithOutRendering = (momentHour) => {
  previous = momentHour;
};

const locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

const renderMessages = (conv, userId, scrollRef, image) => {
  let tmp;
  let tmp1;

  return conv.map((item, index, elements) => {
    const next = elements[index + 1 < conv.length ? index+1 : conv.length -1 ];
    console.log(next)

    if (
      moment(item.Date_Houre).local().format("LL") !==
      moment(next.Date_Houre).local().format("LL")
    ) {
      tmp = moment(next.Date_Houre).local().format("LL") ;
    }

    return (
      <React.Fragment>
      <RegroupByDate itemDate={tmp} />
        <Message
          item={item.item}
          id_Sender={item.id_Sender}
          userId={userId}
          Text={item.Text}
          image={image}
          index={index}
          hours={item.Date_Houre}
          own={item.id_Sender === userId}
        />
      </React.Fragment>
    );
  });
};

/* node.scrollIntoView({
    behavior: "smooth",
    block: "nearest" // <-- only scroll this div, not the parent as well
  })
*/
const findImage = (userId, Profile) => {
  const { Profile1, Profile2 } = Profile;

  console.log(Profile1);
  if (userId === Profile1.ProfileNumber) {
    return Profile2;
  } else {
    return Profile1;
  }
};
const MessageComponent = ({
  pageNumber,
  loading,
  Profile,
  newMessage,
  hasmore,
  moreMessageLoading,
  message,
  userId,
}) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const classes = useStyles();
  const [number, setNumber] = useState(1);
  const position = useRef(null);

  let id_Chat;
  if (message) {
    id_Chat = message[0]?.id_Chat;
  }
  const dispatch = useDispatch();

  const [time, settime] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      settime(!time);
    }, 6000);
  }, [newMessage]);

  console.log(Profile);

  console.log(findImage(userId, Profile));

  const setRef = useCallback(
    (node) => {
      if (node && newMessage) {
        node.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          // <-- only scroll this div, not the parent as well
        });
      }
    },
    [newMessage, message]
  );

  const renderedConv = useMemo(() => {
    return renderMessages(message, userId, setRef, findImage(userId, Profile));
  }, [message, newMessage, userId]);

  const fetchContacts = () => {
    setNumber((prevState) => prevState + 1);
    setTimeout(() => {
      if (hasmore > message.length) {
        dispatch(getMoreMessage(id_Chat, number));
      }
    }, 1000);
  };

  return (
    <div className={classes.MessageBox} ref={position.current} id="scrollable">
      <InfiniteScroll
        dataLength={message.length}
        next={fetchContacts}
        hasMore={hasmore > message.length}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        scrollThreshold={1}
        inverse={true} //
        scrollableTarget="scrollable"
        loader={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={2}
          >
            <CircularProgress size={30}></CircularProgress>
          </Box>
        }
      >
        {renderedConv}
      </InfiniteScroll>
    </div>
  );
};

const mapStateToProps = (state) => ({
  newMessage: state.messageReducer.newMessage,
  hasmore: state.messageReducer.hasmore,
  moreMessageLoading: state.messageReducer.moreMessageLoading,
  pageNumber: state.messageReducer.pageNumber,

  userId: state.auth.user?.id,
  Profile: state.messageReducer.Profile,
  message: state.messageReducer.message,
});

export default connect(mapStateToProps)(MessageComponent);
