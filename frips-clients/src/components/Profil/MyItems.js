import React, { useEffect } from "react";
import {
  Box,
  Typography,
  CardHeader,
  Card,
  Avatar,
  IconButton,
  CardActionArea,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, connect } from "react-redux";
import { fetchMyfrips } from "../../actions/index";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
  },
  GridSystem: {
    display: "grid",
    gridTemplateColumns: "repeat(3,33%)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      padding: 20,
      gridTemplateColumns: "repeat(1,100%)",
    },
  },
  floatContentArticle: {
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
          <CardHeader
            avatar={
              <IconButton>
                <Avatar>S</Avatar>
              </IconButton>
            }
            titleTypographyProps={{
              style: { fontSize: 15 },
            }}
            title="Stefan"
          />
          <Box display="flex" position="relative">
            <CardActionArea
              style={{ width: "100%", height: 300 }}
              onClick={() => {
                history(`/items/${state[index].id}`);
              }}
            >
              <img
                src={`http://localhost:5000/images/${state[index].image[0].id_Item}/${state[index].image[0].image}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardActionArea>
          </Box>
          <Box padding={2}>
            <Typography style={{ fontSize: 16, fontWeight: 600 }}>
              {item.Price}
            </Typography>
            <Typography>{item.Size}</Typography>
            <Typography>{item.Price}</Typography>
          </Box>
          <Box
            position="absolute"
            bottom={20}
            right={15}
            display="flex"
            alignItems="center"
          >
            <Typography style={{ fontSize: 16 }}>Modifier</Typography>
            <IconButton
              onClick={() => {
                history(`/items/edit/${item.id}`);
              }}
            >
              {" "}
              <EditIcon />{" "}
            </IconButton>
          </Box>
        </Card>
      </Box>
    );
  });
};

const MyItems = ({ items, loading }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyfrips());
  }, [dispatch]);
  const classes = useStyles();

  if (items.length < 1 && loading) {
    return (
      <Box
        height="100vh"
        width="100%"
        style={{ backgroundColor: "#F5f5f3" }}
      ></Box>
    );
  }
  console.log(items);

  return (
    <Box width={"100%"} height={"100%"} style={{ backgroundColor: "#F5f5f3" }}>
      <Box height={"15vh"} />
      <Box className={classes.floatContentArticle}>
        <Box margin="auto" padding={3}>
          <Typography style={{ fontSize: 22, fontWeight: 500 }}>
            My Frips
          </Typography>
        </Box>
        <Box padding={3} className={classes.GridSystem}>
          {!loading ? renderedItem(classes, items, history) : null}
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: Object.values(state.myFrips.items),
});

export default connect(mapStateToProps)(MyItems);
