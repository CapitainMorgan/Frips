import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  makeStyles, Typography,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFavorite, fetchMembersInfo, removeFavorite
} from "../../../../actions";
import API_ENDPOINT from "../../../../api/url";
import MyPaginate from "../../../Footer/PaginationComponent";
import InformationProfile from "./InformationProfile";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    borderRadius: 2,
    padding: 2,
    top: 50,
    left: 20,
    position: "absolute",
    width: 280,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      position: "relative",
      top: 0,
      left: 0,
    },
  },
  BoxOneItem: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 2,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  GridSytem: {
    display: "grid",
    gridTemplateColumns: "repeat(5,20%)",
    width: "100%",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2,50%)",
    },
  },
  large: {
    width: 100,
    height: 100,
  },
}));

const renderedItem = (state, classes, favorite, dispatch, navigate) => {
  return state.map((item, index) => {
    return (
      <Box width={"100%"} height={"100%"} padding={1} key={index}>
        <Card className={classes.BoxOneItem}>
          <CardHeader
            avatar={
                <Avatar
                  alt={`${item.account.Pseudo}`}
                  src={`${API_ENDPOINT}/imageProfile/${item.account.id}/${item.account?.image?.image}`}
                />
            }
            titleTypographyProps={{
              style: {
                fontSize: 14,
                color: "#4D4D4D",
              },
            }}
            title={item.account.Pseudo}
          />
          <Box>
            <CardActionArea
              style={{ width: "100%", height: 300 }}
              onClick={() => {
                navigate(`/items/${state[index].id}`);
              }}
            >
              <img
                alt={`${API_ENDPOINT}/images/${state[index].id}/${state[index].image[0].image}`}
                src={`${API_ENDPOINT}/images/${state[index].id}/${state[index].image[0].image}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardActionArea>
          </Box>
          <Box padding={2}>
            <Typography style={{ fontSize: 16, fontWeight: 600 }}>
              {item.Price} CHF
            </Typography>
            <Typography>{item.Size}</Typography>
            <Typography>{item.item_brand[0]?.brand.Name}</Typography>
          </Box>
          <Divider />
          <Box height={44} display="flex" alignItems="center">
            <IconButton
              onClick={() => {
                if (_.some(favorite, { id_Item: item.id })) {
                  dispatch(removeFavorite(state[index].id, 6));
                } else {
                  dispatch(addFavorite(state[index].id, 6));
                }
              }}
            >
              {_.some(favorite, { id_Item: item.id }) ? (
                <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon
                  style={{ color: "grey" }}
                ></FavoriteBorderIcon>
              )}
            </IconButton>

            <Typography>
              {state[index]._count ? state[index]._count.favorit : null}
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  });
};

const MemberProfile = ({ count, loading, items, favorite, account }) => {
  const [pagination, setPagination] = useState(1);
  const classes = useStyles();
  const dispatch = useDispatch();
  let { name } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = ({ selected }) => {
    setPagination(selected + 1);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loading && items.length === 0 && !Boolean(count) &&!account) {
      dispatch(fetchMembersInfo(name, pagination));
    }
  }, [dispatch, loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchMembersInfo(name, pagination));
  }, [dispatch, pagination]);

  if (loading && items.length === 0 && !Boolean(count) && !account) {
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

  if (!loading && items.length === 0 && count === 0 ) {

    return (
      <Box
        minHeight={300}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>{""}</Typography>
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
        <Box height={"10vh"} />
  
        <Box className={classes.floatContentArticle}>
          <Box
            display={"flex"}
            height={"100%"}
            marginBottom={5}
            padding={4}
            alignItems="center"
          >
            <Avatar
            onClick={()=>{
              navigate(`/member/${account?.Pseudo}`)
            }}
              alt={`${account?.Pseudo}`}
              src={`${API_ENDPOINT}/imageProfile/${account?.id}/${account?.image?.image}`}
              className={classes.large}
            />
            <InformationProfile account={account} items={items} />
          </Box>
          <Divider />
  
          <Box padding={3} className={classes.GridSytem} minHeight={300}>
            {renderedItem(items, classes, favorite, dispatch, navigate)}
          </Box>
          <Box className={classes.PaginationBox}>
            <MyPaginate
              pageCount={Math.ceil(count / 10)}
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
        </Box>
      </Box>
    );
  }
};

const mapStateToProps = (state) => ({
  loading: state.members.loading,
  items: state.members.items,
  favorite: state.favoriteReducers.favoritIds,
  account: state.members.account,
  count: state.members.count,
});

export default connect(mapStateToProps)(MemberProfile);
