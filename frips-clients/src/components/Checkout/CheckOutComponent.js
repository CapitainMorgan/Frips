import {
  Box,
  Button,
  CircularProgress,
  Divider,
  makeStyles,
  Popper,
  Typography,
} from "@material-ui/core";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PAYMENT_FAILED, PAYMENT_SUCCESS } from "../../actions/type";
import Adress from "./Adress";
import ModalCostum from "./ModalCostum";
import PaymentForm from "./PaymentForm";
import SecurityBadge from "./SecurityBadge";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import axios from "axios";
import { succeedPayment } from "../../actions";

const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
  },
  boxShadowDelivery: {
    width: 100,
    height: 100,
    borderRadius: 4,
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    "&:hover": {
      background: "transparent",
      cursor: "pointer",
    },
  },

  floatContentInfomrationdiv: {
    width: "30%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      left: "auto",
      right: "auto",
      padding: 20,
    },
  },

  floatContentInformation: {
    boxSizing: "border-box",
    paddingRight: 10,
    height: 565,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "40vh",
      left: "auto",
      right: "auto",
      padding: 20,
    },
    [theme.breakpoints.up("md")]: {
      width: "75%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "75%",
    },
  },
  ContentInformationItem: {
    width: "calc(50% - 5px)",
  },
  ContentInformationButton: {},
  popover: {
    pointerEvents: "none",
  },
  floatContentArticle: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  InformationProduct: {
    width: "70%",
    minHeight: 700,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      left: "auto",
      right: "auto",
      padding: 20,
    },
  },
  TypographyText: {
    fontSize: 16,
    fontWeight: 600,
  },
  TypographyTextSub: {
    color: "grey",
    fontSize: 15,
  },
}));


const customRound = (price) => {
  let decimal = price - Math.floor(price);
  return decimal >= 0.25 && decimal <= 0.75 ? Math.floor(price) + 0.5 : Math.round(price);
};

const CheckOut = ({ loading, cs, item, idAccount }) => {
  const classes = useStyles();
  const [loadingPayment, setloadinPayment] = useState(false);
  let { id } = useParams();
  id = parseInt(id);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { account } = item;

  useEffect(() => {
    async function fetchData(isRerseved) {
      await axios.post("/api/paymentIntent/reserved", {
        idItem: id,
        isRerseved: isRerseved,
      });
    }
    fetchData(true);

    return () => {
      fetchData(false);
    };
  }, []);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setloadinPayment(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      dispatch({ type: PAYMENT_FAILED });
      navigate(`/payment/${id}/paymentStatus`, { replace: true });
    } else {
      dispatch(succeedPayment(id, cs, idAccount, navigate));
    }
  };

  if (cs !== "" && loading) {
    return (
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    );
  }
  return (
    <Box style={{ backgroundColor: "#F5f5f3" }} width={"100%"}>
      <Box height={60}></Box>
      <Box
        width={1000}
        margin="auto"
        className={classes.floatContentArticle}
        position="relative"
      >
        <Box
          className={classes.InformationProduct}
          paddingRight={5}
          display="flex"
          flexDirection="column"
        >
          <Box>
            <Box className={classes.boxShadow} padding={3} display="block">
              <Box marginBottom={5}>
                <Typography className={classes.TypographyText}>
                  Votre commande
                </Typography>
              </Box>
              <Box display={"flex"}>
                <Box
                  id="classes.boxShadowDelivery"
                  className={classes.boxShadowDelivery}
                  onClick={() => {
                    navigate(`/items/${item.id}`);
                  }}
                >
                  <img
                    id={`payment-${item.id}`}
                    alt={`/images/${item.id}/${item.image[0].image}`}
                    src={`/images/${item.id}/${item.image[0].image}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  marginLeft={3}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent="center"
                >
                  <Typography style={{ fontSize: 16 }}>{item.Name}</Typography>
                  <Typography style={{ fontSize: 16 }}>
                    {item.Size} · {item.item_brand[0].brand.Name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box height={40} />
          <Box>
            <Box className={classes.boxShadow} padding={3} display="block">
              <Box marginBottom={2}>
                <Typography className={classes.TypographyText}>
                  Adresse de Livraison
                </Typography>
              </Box>
              <Box height={5} />
              <Box display="flex" alignItems="center">
                <Adress addresse={account} />
              </Box>
            </Box>
          </Box>
          <Box height={40} />

          <form onSubmit={handleSubmit} id={"payment-form"}>
            <Box
              display={"flex"}
              flexDirection="column"
              padding={3}
              className={classes.boxShadow}
            >
              <Box marginBottom={2}>
                <Typography className={classes.TypographyText}>
                  Paiement
                </Typography>
              </Box>
              <PaymentForm idItem={id} />
            </Box>
            <ModalCostum open={loadingPayment} />
            <Box
              display={"flex"}
              justifyContent="center"
              padding={5}
              width={"100%"}
            >
              <SecurityBadge />
              <Button
                style={{ height: 40, flexGrow: 1 }}
                color="primary"
                variant="contained"
                disabled={!stripe}
                type="submit"
                target={"payment-form"}
              >
                Procéder au paiement
              </Button>
            </Box>
          </form>
        </Box>

        <Box width={"30%"} className={classes.floatContentInfomrationdiv}>
          <Box padding={5} className={classes.boxShadow}>
            <Box margin={2}>
              <Typography className={classes.TypographyText}>
                Résumé de la commande
              </Typography>
            </Box>
            <Divider />
            <Box marginTop={2} display="flex">
              <Box className={classes.ContentInformationItem}>
                <Typography className={classes.TypographyText}>
                  Commande
                </Typography>
              </Box>
              <Box className={classes.ContentInformationItem}>
                <Typography>{item.Price} CHF</Typography>
              </Box>
            </Box>

            <Box marginTop={2} display="flex">
              <Box className={classes.ContentInformationItem}>
                <Typography className={classes.TypographyText}>
                  Frais de port
                </Typography>
              </Box>
              <Box className={classes.ContentInformationItem}>x CHF</Box>
            </Box>

            <Box marginTop={2} marginBottom={2} display="flex" flexWrap="wrap">
              <Box
                className={classes.ContentInformationItem}
                display="flex"
                alignItems={"center"}
              >
                <Typography className={classes.TypographyText}>
                  Frais
                </Typography>
                <HelpOutlineIcon
                  style={{ height: "0.85em", width: "0.85em" }}
                />
                <div className={classes.paper}>
                  Frais de transaction + commission.
                </div>
              </Box>
              <Box className={classes.ContentInformationItem}>
                { customRound(item.Price * 0.07)} CHF
              </Box>
            </Box>

            <Divider />

            <Box marginTop={2} display="flex">
              <Box className={classes.ContentInformationItem}>
                <Typography className={classes.TypographyText}>
                  Total
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  cs: state.payment.clientSecret,
  loading: state.payment.loading,
  idAccount: state.auth.user.id,
  item: state.payment.item,
});

export default connect(mapStateToProps)(CheckOut);
