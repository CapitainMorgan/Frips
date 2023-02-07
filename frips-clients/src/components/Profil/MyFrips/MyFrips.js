import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CircularProgress,
  IconButton,
  makeStyles,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  changeMyFripsPagination,
  getNotificationsMyFrips,
} from "../../../actions/index";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AiOutlineStock } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import { ImPower } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyItems from "./MyItems";
import Filter from "./Filter";
import MyPaginate from "../../Footer/PaginationComponent";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MyProposition from "./MyProposition";
import MySell from "./MySell/MySell";
import MyPurchase from "./MyPurchase/MyPurchase";

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
    width:"13%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    "&:hover": {
      backgroundColor: "rgba(205, 217, 231,1)",
    },
    cursor: "pointer",
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
  { Name: "Mes propositions"},
  { Name: "Mes achats" },
];

const renderNavigationArray = (
  navigationArray,
  setNavigation,
  propositionNotif,
  sellNotif
) => {
  return navigationArray.map((navigationItem, index) => {
    console.log(propositionNotif);
    if (navigationItem.Name ==="Mes ventes") {
      return (
        <Badge color="primary" badgeContent={sellNotif?.length}>
          <Button
            key={navigationItem.Name}
            style={{ marginLeft: 10 }}
            variant="outlined"
            color="primary"
            onClick={() => {
              setNavigation(index);
            }}
          >
            {navigationItem.Name}
          </Button>
        </Badge>
      );
    }
    if (navigationItem.Name ==="Mes propositions") {
      return (
        <Badge color="primary" badgeContent={propositionNotif?.length}>
          <Button
            key={navigationItem.Name}
            style={{ marginLeft: 10 }}
            variant="outlined"
            color="primary"
            onClick={() => {
              setNavigation(index);
            }}
          >
            {navigationItem.Name}
          </Button>
        </Badge>
      );
    } else {
      return (
        <Button
          key={navigationItem.Name}
          style={{ marginLeft: 10 }}
          variant="outlined"
          color="primary"
          onClick={() => {
            setNavigation(index);
          }}
        >
          {navigationItem.Name}
        </Button>
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
    window.scrollTo(0,0)
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
          <Box display={"flex"}>
            {renderNavigationArray(
              navigationArray,
              setNavigation,
              propositionNotif,sellNotif
            )}
          </Box>
          <Box>
            <Box display={"flex"} alignItems="center" padding={3}>
              <Typography style={{ fontSize: 16 }}>
                Envie de Booster un petit peu ton profil ?
              </Typography>
              <AiOutlineStock color="primary" size={"2em"} />
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

          <Box padding={3} className={classes.columnGrid}>
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
  count:state.myFrips.count,


  filterMyFrips: state.myFrips.filter,
});

export default connect(mapStateToProps)(MyFrips);
