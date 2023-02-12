import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMyFripsPagination, fetchMyfrips } from "../../../../actions";
import { FETCH_MYPURCHASE, FETCH_MYSELL } from "../../../../actions/type";
import { TiWarning } from "react-icons/ti";
import DeliveryStep from "../MySell/DeliveryStep";
import MyPaginate from "../../../Footer/PaginationComponent";
import PurchaseStep from "./PurchaseStep";


const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
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
  menus: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "inherit",
      flexGrow: 1,
      justifyContent: "flex-end",
      marginTop: 8,
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
  details: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    [theme.breakpoints.down("sm")]: {
      marginTop: 8,
    },
  },
  delivery: {
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  send: {
    display: "flex",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
    height: 100,

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const renderDeliveryStep = ({ DateSend }) => {
  if (!DateSend) {
    return (
      <Badge overlap="circle">
        <Box display={"flex"} alignItems="center">
          <Typography style={{ fontSize: 16 }} component="span" color="inherit">
            <TiWarning color="#dc3545 " size={"1.7em"} />A livrer
          </Typography>
        </Box>
      </Badge>
    );
  } else {
    return (
      <Badge
        badgeContent={
          <Typography component="span" color="inherit">
            Laisser une Review
          </Typography>
        }
      ></Badge>
    );
  }
};

const renderedItem = (classes, state, history) => {
  return state.map((item, index) => {
    const { account } = item;
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
                  marginTop: 1,
                }}
              >
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                  {item.Price} CHF
                </Typography>
                <Typography>{item.Size}</Typography>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Typography style={{ fontSize: 15 }}>Vendu à </Typography>

              <Box
                flexGrow={1}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
              >
                <Typography style={{ fontSize: 15 }}>
                  {account.Pseudo}
                </Typography>
              </Box>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Typography style={{ fontSize: 15 }}>
                Type de Livraison
              </Typography>

              <Box
                flexGrow={1}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
              >
                <Typography>{"dsa"}</Typography>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Typography style={{ fontSize: 15 }}>Prix</Typography>

              <Box
                flexGrow={1}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
              >
                <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                  {item.Price}
                </Typography>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Typography style={{ fontSize: 15 }}>Status</Typography>
              <Box
                flexGrow={1}
                display="flex"
                justifyContent={"center"}
                alignItems="center"
              >
                <Typography style={{ fontSize: 15 }}>
                  {renderDeliveryStep(item)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <PurchaseStep classesSell={classes} item={item} id={item.id} account={account} />
        </Card>
      </Box>
    );
  });
};

const MyPurchase = ({
  mobile,
  pagination,
  filterMyFrips,
  loading,
  items,
  msg,
  count,
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles()
  const handleChange = ({ selected }) => {
    dispatch(changeMyFripsPagination(selected + 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_FILTER_MYFRIPS" });
    };
  }, [dispatch]);

  useEffect(() => {
    if (!loading && items.length === 0 && Boolean(count)) {
      dispatch(fetchMyfrips(`/api/members/myPurchase`, FETCH_MYPURCHASE));
    }
  }, [dispatch, loading]);

  useEffect(() => {
    dispatch(fetchMyfrips(`/api/members/myPurchase`, FETCH_MYPURCHASE));
  }, [filterMyFrips, pagination]);

  if (loading && items.length === 0 && !Boolean(count)) {
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

  if (!loading && items.length === 0 && count === 0) {
    return (
      <Box
        minHeight={200}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>
          {msg}
        </Typography>
        

      </Box>
    );
  }

  return (
    <Box minHeight={300} className={classes.items}>
      {renderedItem(classes, items, history)}
      {Boolean(count) ? (
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
      ) : null}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: state.myFrips.purchase,
  pagination: state.myFrips.pagination,
  filterMyFrips: state.myFrips.filter,
  count: state.myFrips.count,
  msg: state.myFrips.msg,

});

export default connect(mapStateToProps)(MyPurchase);
