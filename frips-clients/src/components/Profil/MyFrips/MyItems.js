import {
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  IconButton,
  Typography,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { changeMyFripsPagination, fetchMyfrips } from "../../../actions";
import MyPaginate from "../../Footer/PaginationComponent";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteModal from "./DeleteModal";
import { FETCH_MYFRIPS } from "../../../actions/type";
const renderedItem = (
  classes,
  state,
  history,
  handleClick,
  setNavigation,
  expand,
  toggleAcordion
) => {
  return state.map((item, index) => {
    if (
      !Boolean(item?.pricepropose[0]?.Approve) &&
      !Boolean(item?.pricepropose[0]?.dateApprove)
    ) {
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
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
              >
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
              <Box justifyContent={"center"} display="flex" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  supprimer
                  <DeleteForeverIcon />
                </Button>
              </Box>
            </Box>

            {Boolean(item?.pricepropose[0]?.Price) ? (
              <Accordion expanded={expand}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  onClick={toggleAcordion}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >

                  <Badge
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                                        
                    variant={"dot"}
                    color={"primary"}
                    invisible={expand}
                  >
                    <Typography style={{fontSize:16}}>
                    Vous avez une offre
                    </Typography>
                  </Badge>
                
                </AccordionSummary>
                <AccordionDetails>
                  <Box display={"flex"} alignItems="center" width={"100%"}>
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                      {item?.pricepropose[0]?.Price} CHF
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent="flex-end"
                      flexGrow={1}
                    >
                      <Button
                        style={{ marginLeft: 5 }}
                        variant="outlined"
                        color="primary"
                        onClick={handleClick}
                      >
                        Accepter
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 5 }}
                      >
                        Refuser
                      </Button>
                    </Box>
                  </Box>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography
                    onClick={() => {
                      setNavigation(3);
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: 16,
                      color: "#82A0C2",
                      borderBottom: "1px solid",
                      borderColor: "#82A0C2",
                    }}
                  >
                    Envie de voir plus d'offres ?
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ) : null}
          </Card>
        </Box>
      );
    } else {
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
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
              >
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
              <Box justifyContent={"center"} display="flex" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleClick(item.id);
                  }}
                >
                  supprimer
                  <DeleteForeverIcon />
                </Button>
              </Box>
            </Box>

            {Boolean(item?.pricepropose[0]?.Price) ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Voir les offres
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box display={"flex"} alignItems="center" width={"100%"}>
                    <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                      {item?.pricepropose[0]?.Price} CHF
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent="flex-end"
                      flexGrow={1}
                    >
                      <Button
                        style={{ marginLeft: 5 }}
                        variant="outlined"
                        color="primary"
                        onClick={handleClick}
                      >
                        Accepter
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 5 }}
                      >
                        Refuser
                      </Button>
                    </Box>
                  </Box>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography
                    onClick={() => {
                      setNavigation(3);
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: 16,
                      color: "#82A0C2",
                      borderBottom: "1px solid",
                      borderColor: "#82A0C2",
                    }}
                  >
                    Envie de voir plus d'offres ?
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ) : null}
          </Card>
        </Box>
      );
    }
  });
};

const MyItems = ({
  classes,
  items,
  loading,
  setNavigation,
  pagination,
  filterMyFrips,
  mobile,
  count,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [expand, setExpand] = useState(true);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };
  const handleChange = ({ selected }) => {
    dispatch(changeMyFripsPagination(selected + 1));
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (number) => {
    setAnchorEl(number);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
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
    dispatch(fetchMyfrips(`/api/members/myFrips`, FETCH_MYFRIPS));
  }, [dispatch, filterMyFrips, pagination]);

  return (
    <Box>
      <DeleteModal anchorEl={anchorEl} handleClickAway={handleClickAway} />
      {renderedItem(
        classes,
        items,
        history,
        handleClick,
        setNavigation,
        expand,
        toggleAcordion
      )}
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
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: state.myFrips.items,
  pagination: state.myFrips.pagination,
  filterMyFrips: state.myFrips.filter,
  count: state.myFrips.count,
});

export default connect(mapStateToProps)(MyItems);
