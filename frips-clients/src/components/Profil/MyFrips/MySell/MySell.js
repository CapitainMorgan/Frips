import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { FETCH_MYSELL, FETCH_PROPOSITION } from "../../../../actions/type";
import { connect, useDispatch } from "react-redux";
import { changeMyFripsPagination, fetchMyfrips } from "../../../../actions";
import MyPaginate from "../../../Footer/PaginationComponent";
import { useNavigate } from "react-router-dom";

const renderedItem = (
  classes,
  state,
  history,
  
) => {
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
                <Typography>sdds</Typography>
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
                <Typography>{"dsa"}</Typography>
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
                <Typography>{"dsadas"}</Typography>
              </Box>
            </Box>
            <Box justifyContent={"center"} display="flex" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                
              >
                supprimer
                <DeleteForeverIcon />
              </Button>
            </Box>
          </Box>

          
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
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
                  invisible={true}
                >
                  <Typography style={{ fontSize: 16 }}>
                    Vous avez une offre
                  </Typography>
                </Badge>
              </AccordionSummary>
              <AccordionDetails>
                <Box display={"flex"} alignItems="center" width={"100%"}>
                  <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                    {321} CHF
                  </Typography>
                  <Box display={"flex"} justifyContent="flex-end" flexGrow={1}>
                    <Button
                      style={{ marginLeft: 5 }}
                      variant="outlined"
                      color="primary"
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
              
              </AccordionDetails>
            </Accordion>
          
        </Card>
      </Box>
    );
  });
};

const MySell = ({
  
  mobile,
  classes,
  pagination,
  filterMyFrips,
  loading,
  items,
  count,
}) => {
  const history = useNavigate()
  const dispatch = useDispatch();
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
    dispatch(fetchMyfrips(`/api/members/mySell`, FETCH_MYSELL));
  }, [dispatch, filterMyFrips, pagination]);

  if (!loading && items.length === 0 && count === 0) {
    return (
      <Box
        minHeight={200}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <Typography style={{ fontSize: 16 }}>
          Vous avez actuellement aucune ventes
        </Typography>
      </Box>
    );
  }

  return (
      <Box minHeight={200} className={classes.PaginationBox}>
      {renderedItem(classes,items,history)}
        {count!==0 ? <MyPaginate
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
        />:null}
      </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: state.myFrips.sell,
  pagination: state.myFrips.pagination,
  filterMyFrips: state.myFrips.filter,
  count: state.myFrips.count,
});

export default connect(mapStateToProps)(MySell);
