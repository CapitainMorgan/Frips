import {
  Avatar,
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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchMyfrips } from "../../../actions/index";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AiOutlineStock } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import { ImPower } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MySell from "./MySell";
import MyItems from "./MyItems";
import Filter from "./Filter";
import MyPaginate from "../../Footer/PaginationComponent";
import { useTheme } from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
    gridTemplateColumns: "repeat(5,20%)",
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
    "&:hover": {
      backgroundColor: "rgba(205, 217, 231,1)",
    },
    cursor:"pointer",
    
  },
}));

const renderedItem = (classes, state, history) => {
  return state.map((item, index) => {
    return (
      <Box
        width={"100%"}
        height={"100%"}
        padding={1}
        position="relative"
        key={item.id}
        id={item.id}
      >
        <Card className={classes.boxShadow}>
          <Box className={classes.Grid}>
            <Box display={"flex"} justifyContent="center" alignItems={"center"}>
              <CardActionArea
                style={{ width: 180, height: 180 }}
                onClick={() => {
                  history(`/items/${state[index].id}`);
                }}
              >
                <img
                  alt={state[index].image[0].id_Item}
                  src={`http://localhost:5000/images/${state[index].image[0].id_Item}/${state[index].image[0].image}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </CardActionArea>
            </Box>
            <Box
              padding={2}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography style={{ wordBreak: "break-word" }} color="primary">
                {item.Name}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: 5,
                }}
              >
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                  {item.Price} CHF
                </Typography>
                <Typography>{item.Size}</Typography>
                <Typography>{item.item_brand[0]?.brand.Name}</Typography>
              </Box>
            </Box>
            <Box justifyContent={"center"} display="flex" alignItems="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  history(`/items/edit/${item.id}`);
                }}
              >
                modifier
                <EditIcon />
              </Button>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Box>Nombre de vue</Box>
              <Box
                flexGrow={1}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
              >
                <Typography>{item?._count.nbview}</Typography>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Box>Nombre de j'aime</Box>
              <Box
                flexGrow={1}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
              >
                <Typography>{item?._count.favorit}</Typography>
              </Box>
            </Box>
          </Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Meilleure offre
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>voir toutes les offres</Box>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Box>
    );
  });
};

const handleNavigation = (key,classes) => {

  switch (key) {
    case 0:
      return <MyItems classes={classes} /> 
    case 1:
      return <MySell />
      
  
    default:
      return <MyItems classes={classes} /> 
  }
};

const navigationArray = [
  { Name: "Mes Items" },
  { Name: "Mes ventes" },
  { Name: "Mes Items" },
  { Name: "Mes propositions" },
  {Name:"Mes achats"},
  {Name:"Promotion"}
];

const renderNavigationArray = (navigationArray,setNavigation) =>{
  return navigationArray.map((navigationItem,index)=>{
    return(
      <Button key={navigationItem.Name} style={{marginLeft:5}} variant="outlined" color="primary" onClick={()=>{
        setNavigation(index)
      }}>
            {navigationItem.Name}
      </Button>
    )
  })
}



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
const MyFrips = ({ items, loading,filterMyFrips ,count,pagination}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles()
  const [navigationId,setNavigation] = useState(0)
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = ({ selected }) => {
  };
  
  useEffect(()=>{
    return ()=>{
      dispatch({type:"RESET_FILTER_MYFRIPS"})
    }
  },[navigationId,dispatch])

  if (loading) {
    return (
      <Box
      style={{ backgroundColor: "#F5f5f3" }}
      display="flex"
      justifyContent="center"
      width="100%"
      height={"100%"}
      alignItems="center"
    >
      <CircularProgress size={100} />
    </Box>
    );
  }

  else{
    return (
      <Box
        width={"100%"}
        style={{ backgroundColor: "#F5f5f3" }}
        position="relative"
      >
        <Box height={"15vh"} />
  
        <Box className={classes.floatContentArticle}>
          <Box margin="auto" padding={3} display="flex" alignItems={"center"}>
            <GiClothes size={20} />
            <Typography style={{ fontSize: 25, fontWeight: 500 }}>
              MyFrips
            </Typography>
          </Box>
        <Box display={"flex"}>
        {renderNavigationArray(navigationArray,setNavigation)}
        </Box>
          <Box display={"flex"}>
            <Box display={"flex"} alignItems="center" padding={3}>
              <Typography style={{ fontSize: 16 }}>
                Envie de Booster un petit peu ton profil ?
              </Typography>
              <AiOutlineStock color="primary" size={"2em"} />
              <Filter id={navigationId} classes={classes} filterMyFrips={filterMyFrips} />
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
          {handleNavigation(navigationId,classes)}
          </Box>
        </Box>
        <MyPaginate
            pageCount={Math.ceil(count / 5)}
            onPageChange={handleChange}
            pageRangeDisplayed={!mobile ? 2 : 1}
            forcePage={pagination - 1}
            marginPagesDisplayed={!mobile ? 2 : 1}
            nextLabel={
              <ArrowForwardIosIcon
                style={{
                  color:
                    pagination !== Math.ceil(count / 5)
                      ? "rgba(130, 160, 194, 1)"
                      : "grey",
                }}
              />
            }
            nextClassName={classes.arrow}
            previousLabel={
              <ArrowBackIosIcon
                style={{
                  color: pagination !== 1 ? "rgba(130, 160, 194, 1)" : "grey",
                }}
              />
            }
          />
      </Box>
    );
  }
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: state.myFrips.items,
  filterMyFrips:state.myFrips.filter,
  pagination:state.myFrips.pagination,
  count:state.myFrips.count
});

export default connect(mapStateToProps)(MyFrips);
