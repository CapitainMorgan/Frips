import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import _ from "lodash";
import React, { useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../../actions";
import API_ENDPOINT from "../../../api/url";

const renderedItem = (state, classes, favorite, dispatch, history,mobile) => {
  return state.map((item, index) => {
    if (index === state.length - 1 && !mobile) {
      return (
        <Box
          width={"100%"}
          height={"100%"}
          padding={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Card
            className={classes.BoxOneItem}
            style={{
              backgroundColor: "#f5f6f7",
              borderRadius: 5,
              opacity: 0.6,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              style={{ width: "100%", height: "100%" }}
            >
              <CardActionArea
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  history("/items/allNewItems");
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ width: "100%", height: "100%" }}
                >
                  <Typography style={{ color: "black", fontSize: 20 }}>
                    Afficher plus
                  </Typography>
                </Box>
              </CardActionArea>
            </Box>
          </Card>
        </Box>
      );
    }
    
    if(index === state.length - 1 && mobile){
      return;
    }
    
    else {
      return (
        <Box width={"100%"} height={"100%"} padding={1}>
          <Card className={classes.BoxOneItem}>
          <Box
            display={"flex"}
            alignItems="center"
            
            marginBottom={2}
            width="100%"
          >
            <IconButton
              onClick={() => {
                history(`/member/${item.account.Pseudo}`);
              }}
            >
              <Avatar
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  cursor: "pointer",
                }}
                alt={`${item.account.Pseudo}`}
                src={`${API_ENDPOINT}/imageProfile/${item.account.id}/${item.account?.image?.image}`}
              />
            </IconButton>
            <Typography
              style={{
                wordBreak:"break-all"
              }}
            >
              {item.account.Pseudo}
            </Typography>
          </Box>
            <Box>
              <CardActionArea
                style={{ width: "100%", height: 300 }}
                onClick={() => {
                  history(`/items/${state[index].id}`);
                }}
              >
                <img
                  alt={`/images/${state[index].id}/${state[index].image[0].image}`}
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
              <Typography>{item.Brand}</Typography>
            </Box>
            <Divider />
            <Box height={44} display="flex" alignItems="center">
              <IconButton
                onClick={() => {
                  if (_.some(favorite, { id_Item: item.id })) {
                    dispatch(removeFavorite(state[index].id, 4));
                  } else {
                    dispatch(addFavorite(state[index].id, 4));
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
    }
  });
};

const DisplayNewItems = ({ classes, favorite, loading,mobile }) => {
  const history = useNavigate();

  const dispatch = useDispatch();

  const items = useSelector((state) => state.items.newItem);

  const renderedItems = useMemo(() => {
    return renderedItem(items, classes, favorite, dispatch, history,mobile);
  }, [items, favorite]);
  if (!loading) {
    return <Box className={classes.GridSytem}>{renderedItems}</Box>;
  }
};

const mapStateToProps = (state) => ({
  items: state.items.newItem,
  loading: state.items.loading,
});

export default connect(mapStateToProps)(DisplayNewItems);
