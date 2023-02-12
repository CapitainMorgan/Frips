import {
  Badge,
  Box,
  Button,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GiClothes } from "react-icons/gi";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNotificationsMyFrips } from "../../../actions/index";
import Filter from "./Filter";
import MyItems from "./MyItems";
import MyProposition from "./MyProposition";
import MyPurchase from "./MyPurchase/MyPurchase";
import MySell from "./MySell/MySell";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
  },
  columnGrid: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      padding: 20,
      gridTemplateColumns: "repeat(1,100%)",
    },
  },
  Grid: {
    display: "grid",
    padding: 10,
    gridTemplateColumns: "repeat(6,16.66%)",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      padding: 20,
      gridTemplateColumns: "repeat(1,100%)",
    },
  },
  floatContentArticle: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: 1000,
    margin: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
      display: "block",
    },
  },
  checkBox: {
    position: "absolute",
    "&:hover": {
      background: "transparent",
    },
    right: 0,
  },
  hover: {
    width: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(205, 217, 231,1)",
    },
    cursor: "pointer",
    marginTop: 50,
    [theme.breakpoints.down("sm")]: {
      width: "25%",
    },
  },
  items: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },

  BoxMenus: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
    },
  },

  badgeBox: {
    marginLeft: 15,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: 10,
    },
  },
  badgeStyle: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },

  Description: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "inherit",
      justifyContent: "flex-end",
      marginTop: 8,
    },
  },
  PaginationBox: {
    height: 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      backgroundColor:"#F5f5f3"

    },
  },
}));

const handleNavigation = (key, classes, setNavigation) => {
  switch (key) {
    case 0:
      return <MyItems classes={classes} setNavigation={setNavigation} />;
    case 1:
      return <MySell classes={classes} />;
    case 2:
      return <MySell classes={classes} />;
    case 3:
      return <MyProposition classes={classes} />;
    case 4:
      return <MyPurchase classes={classes} />;

    default:
      return <MyItems classes={classes} />;
  }
};

const navigationArray = [
  { Name: "Mes Items" },
  { Name: "Promotion" },
  { Name: "Mes ventes" },
  { Name: "Mes propositions" },
  { Name: "Mes achats" },
];

const renderNavigationArray = (
  navigationArray,
  setNavigation,
  propositionNotif,
  sellNotif,
  classes,
  mobile
) => {
  return navigationArray.map((navigationItem, index) => {
    console.log(propositionNotif);
    if (navigationItem.Name === "Mes ventes") {
      return (
        <Badge
          className={classes.badgeStyle}
          color="primary"
          badgeContent={sellNotif?.length && !mobile ? sellNotif?.length : null}
        >
          <Button
            key={navigationItem.Name}
            className={classes.badgeBox}
            variant="outlined"
            color="primary"
            onClick={() => {
              setNavigation(index);
            }}
          >
            {navigationItem.Name}

            {mobile ? (
              <Box display="flex" justifyContent="flex-end" flexGrow={1}>
              {sellNotif?.length !== 0 ? <Box
                  style={{
                    color: "black",
                    backgroundColor: "#82A0C2",
                    height: 20,
                    width: 20,
                    borderRadius: "25%",
                  }}
                >
                  {sellNotif?.length !== 0
                    ? sellNotif?.length
                    : null}
                </Box> : null}
              </Box>
            ) : null}
          </Button>
        </Badge>
      );
    }
    if (navigationItem.Name === "Mes propositions") {
      return (
        <Badge
          className={classes.badgeStyle}
          color="primary"
          badgeContent={
            propositionNotif?.length && !mobile
              ? propositionNotif?.length
              : null
          }
        >
          <Button
            key={navigationItem.Name}
            className={classes.badgeBox}
            variant="outlined"
            color="primary"
            onClick={() => {
              setNavigation(index);
            }}
          >
            {navigationItem.Name}
            {mobile ? (
              <Box display="flex" justifyContent="flex-end" flexGrow={1}>
                {propositionNotif?.length !== 0 ? <Box
                  style={{
                    color: "black",
                    backgroundColor: "#82A0C2",
                    height: 20,
                    width: 20,
                    borderRadius: "25%",
                  }}
                >
                  {propositionNotif?.length !== 0
                    ? propositionNotif?.length
                    : null}
                </Box> : null}
              </Box>
            ) : null}
          </Button>
        </Badge>
      );
    } else {
      return (
        <Badge className={classes.badgeStyle} color="primary">
          <Button
            key={navigationItem.Name}
            className={classes.badgeBox}
            variant="outlined"
            color="primary"
            onClick={() => {
              setNavigation(index);
            }}
          >
            {navigationItem.Name}
            {mobile ? (
              <Box display="flex" justifyContent="flex-end" flexGrow={1}></Box>
            ) : null}
          </Button>
        </Badge>
      );
    }
  });
};

const notify = (accountName) => {
  toast.info(
    <Box fontSize={16} display="flex" alignItems={"center"}>
      <Box width={"100%"} justifyContent={"center"} display="flex">
        <Typography style={{ fontSize: 16 }}>
          Hey {accountName} ! Envie de Booster un petit peu ton profil ? C'est
          par ici
        </Typography>
      </Box>
    </Box>
  );
};
const MyFrips = ({
  items,
  loading,
  filterMyFrips,
  sell,
  count,
  purchase,
  propositionNotif,
  sellNotif,
  proposition,
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [navigationId, setNavigation] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getNotificationsMyFrips());
    window.scrollTo(0, 0);
  }, []);

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      width={"100%"}
      style={{ backgroundColor: "#F5f5f3" }}
      position="relative"
    >
      <Box height={"10vh"} />

      <Box className={classes.floatContentArticle}>
        <Box margin="auto" padding={3} display="flex" alignItems={"center"}>
          <GiClothes size={20} />
          <Typography style={{ fontSize: 25, fontWeight: 500 }}>
            MyFrips
          </Typography>
        </Box>
        <Box className={classes.BoxMenus}>
          {renderNavigationArray(
            navigationArray,
            setNavigation,
            propositionNotif,
            sellNotif,
            classes,
            mobile
          )}
        </Box>
        <Box>
          <Box display={"flex"} alignItems="center" marginLeft={3}>
            <Filter
              filterMyFrips={filterMyFrips}
              id={navigationId}
              classes={classes}
            />
            <Button
              style={{ marginLeft: 20 }}
              color="primary"
              variant="contained"
              onClick={() => {
                notify("caca");
              }}
            >
              En savoir plus
            </Button>
          </Box>
        </Box>

        <Box padding={3} className={classes.columnGrid} minHeight={300}>
          {handleNavigation(navigationId, classes, setNavigation)}
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: state.myFrips.items,
  sell: state.myFrips.sell,
  purchase: state.myFrips.purchase,
  proposition: state.myFrips.proposition,
  propositionNotif: state.myFrips.propositionNotification,
  sellNotif: state.myFrips.sellNotification,
  count: state.myFrips.count,

  filterMyFrips: state.myFrips.filter,
});

export default connect(mapStateToProps)(MyFrips);
