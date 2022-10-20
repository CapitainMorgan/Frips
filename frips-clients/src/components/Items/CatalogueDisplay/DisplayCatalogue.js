import React, { useEffect, useMemo, useState } from "react";

import {
  Avatar, Box,
  Card, CardActionArea, CardHeader, CircularProgress, Divider, IconButton, makeStyles, Typography, useMediaQuery,
  useTheme
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import _ from "lodash";
import ReactPaginate from "react-paginate";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  addFavorite, changePagination, getItemCreationInfo,
  paginationForFilter
} from "../../../actions";
import {
  Catalogue
} from "../staticItems/staticItemName";
import CostumChips from "./CostumChips";
import RenderChipsComponents from "./renderChipsComponents";

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
  },
  GridSytem: {
    display: "grid",
    gridTemplateColumns: "repeat(5,20%)",
    width: "100%",
    position: "relative",

    minHeight: 400,
    opacity: (props) => {
      if (props) {
        return 0.3;
      } else {
        return null;
      }
    },
    transition: (props) => {
      if (props) {
        return "opacity .25s ease-out";
      } else {
        return null;
      }
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(2,50%)",
    },
  },
  pagination: {
    flexWrap: "nowrap",
    width: "50%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      overflow: "hidden",
      flexWrap: "nowrap",
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
      margin: "auto",
      flex: "none",
    },
  },
}));

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: "active", // default to "disabled"
})`
  margin: 0;
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  li a {
    height: 40px;
    padding: 0 10px;
    font-size: 0.9375rem;
    min-width: 40px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.23);

    color: rgba(0, 0, 0, 0.87);
    margin: 0 3px;
    box-sizing: border-box;
    text-align: center;
    font-family: "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.43;
    cursor: pointer;
    display: inline-flex;
    outline: 0;
    position: relative;
    align-items: center;
    user-select: none;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: rgba(130, 160, 194, 0.3);
    border-color: 1px solid rgba(130, 160, 194, 0.5);
    color: #82a0c2;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const renderedItem = (state, classes, favorite, dispatch, history) => {

  return state.map((item, index) => {
    let category = item.item_category[0].category.Name
    let brand = item.item_brand[0].brand.Name
    return (
      <Box width={"100%"} height={"100%"} padding={1} id={item}>
        <Card className={classes.BoxOneItem}>
          <CardHeader
            avatar={
              <IconButton>
                <Avatar>S</Avatar>
              </IconButton>
            }
            titleTypographyProps={{
              style: {
                fontSize: 14,
              },
            }}
            title={item.account?.Pseudo}
          />
          <Box>
            <CardActionArea
              style={{ width: "100%", height: 300 }}
              onClick={() => {
                history(`/items/${state[index].id}`);
              }}
            >
              <img
                alt={`/images/${state[index].id}/${state[index].image[0].image}`}
                src={`/images/${state[index].id}/${state[index].image[0].image}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </CardActionArea>
          </Box>
          <Box padding={2}>
            <Typography style={{ fontSize: 16, fontWeight: 600 }}>
              {item.Price} CHF
            </Typography>
            <Typography>{item.Size}</Typography>
            <Typography>{brand}</Typography>
            <Typography>{category}</Typography>

          </Box>
          <Divider />
          <Box height={44} display="flex" alignItems="center">
            <IconButton
              onClick={() => {
                dispatch(addFavorite(state[index].id));
              }}
            >
              {item.id === true ? (
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

const filterBy = [
  { Name: "Prix décroissant", id: 0, label: "sortedBy" },
  { Name: "Prix croissant", id: 1, label: "sortedBy" },
];



const DisplayCatalogue = ({
  items,
  loaded,
  loading,
  itemInfo,
  pagination,
  count,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles(loading);
  const theme = useTheme();
  const history = useNavigate();
  const location = useLocation()
  const params = useParams()
 
 
  useEffect(() => {
    if (itemInfo) {
      setTypeOfFilter([
        { label: "Catalogue", array: Catalogue },
        { label: "Couleur", array: itemInfo.itemColorInfo },
        { label: "Marque", array: itemInfo.brandInfo },
        { label: "Price", array: null },
        { label: "Etat", array: itemInfo.itemconditionInfo },
        { label: "sortedBy", array: filterBy },
      ]);
      
    } else {
      dispatch(getItemCreationInfo());
    }
  }, [dispatch, itemInfo]);
  

    
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const favorite = useSelector((state) => state.favoriteReducers.favorit);
  const handleChange = ({ selected }) => {
    dispatch(changePagination(selected + 1));
  };

  const [filterItem, setFilterItem] = useState(items);
  const allFilterProps = useSelector(
    (state) => state.filterCatalogue.AllFilter
  );
  const stateToFilter = useSelector((state) => state.filterCatalogue.Chips);

  const [typeOfFilter, setTypeOfFilter] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination]);

  useEffect(() => {
    if (items.length !== 0 && !loading && loaded) {
      setFilterItem(items);
    }
  }, [items, dispatch]);

  

  

  

  useEffect(() => {
    if (stateToFilter.length !== 0) {
      const firstPrice = _.find(stateToFilter, { De: true })
        ? _.find(stateToFilter, { De: true })
        : 0;
      const secondPrice = _.find(stateToFilter, { A: true })
        ? _.find(stateToFilter, { A: true })
        : 1000;

      const filterArray = items.filter(
        ({ Price, itemcondition, item_color, item_brand }) => {
          let [firstColor, SecondColor] = item_color;
          const [brand] = item_brand;

          return (
            _.some(stateToFilter, firstColor.color) ||
            (SecondColor ? _.some(stateToFilter, SecondColor.color) : null) ||
            _.some(stateToFilter, brand.brand) ||
            _.some(stateToFilter, itemcondition) ||
            parseInt(firstPrice.value) <= Price ||
            Price <= parseInt(secondPrice.value)
          );
        }
      );

      dispatch(paginationForFilter(allFilterProps, filterArray));
    } else {
      dispatch(paginationForFilter(allFilterProps, []));
    }
  }, [stateToFilter, allFilterProps, pagination]);

  const renderedItems = useMemo(() => {
    return renderedItem(filterItem, classes, favorite, dispatch, history);
  }, [filterItem, items, allFilterProps, loaded]);



  if (filterItem.length === 0) {
    return (
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
        width="100%"
        height="100vh"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }
  return (
    <Box
      style={{ backgroundColor: "#F5f5f3" }}
      display="flex"
      justifyContent="center"
      id="scrollable"
    >
      <Box width={"100%"} margin="auto">
        <Box height={"10vh"} />

        <Box
          display="flex"
          flexDirection={"column"}
          margin={"auto"}
          width={"100%"}
          padding={4}
        >
          {typeOfFilter ? <CostumChips TypeCatalogue={typeOfFilter} /> : null}
          <RenderChipsComponents />
        </Box>

        <Box height={"10vh"} />

        <Box className={classes.GridSytem}>{renderedItems}</Box>

        <Box className={classes.PaginationBox}>
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
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  items: Object.values(state.filterCatalogue?.items),
  loading: state.filterCatalogue.loading,
  loaded: state.filterCatalogue.loaded,
  count: state.filterCatalogue.count,

  itemInfo: state.itemInfo.itemInfo,
  pagination: state.filterCatalogue.pagination,
  idFavorite: state.items.favorites,
  filterLoading: state.filterCatalogue.filterLoading,
  filterLoaded: state.filterCatalogue.filterLoaded,
});

export default connect(mapStateToProps)(DisplayCatalogue);
