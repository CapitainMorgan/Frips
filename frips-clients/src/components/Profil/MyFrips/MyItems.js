import {
  Box,
  Button,
  Card,
  CardActionArea,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect } from "react";
import {connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { fetchMyfrips } from "../../../actions";

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

const MyItems = ({classes, items, loading}) => {
    const dispatch = useDispatch()
    const history = useNavigate();
    console.log(items)
  useEffect(() => {
    if (items.length === 0 && !loading) {
      dispatch(fetchMyfrips());
    }
  }, [dispatch, loading])




  return (
    <Box>{renderedItem(classes, items, history)}</Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.myFrips.loading,
  items: state.myFrips.items,
});

export default connect(mapStateToProps)(MyItems);
