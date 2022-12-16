import React, { useEffect, useState } from "react";

import { Box, CircularProgress } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPaymentInfo } from "../../actions";
import CheckOutComponent from "./CheckOutComponent";

const PUBLIC_KEY =
  "pk_test_51JfniQEK6bYR8YbaaWm4fKWZR0O6qG62d0wBMIC4tvaRlK5IqDJXTPwbwwkxi65mGp8MyYjF5e9hOd52KMWmy9EL0012kg008l";
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({ cs, loading }) => {
  let { id } = useParams();
  id = parseInt(id);


  const dispatch = useDispatch();

  const appearance = {
    theme: "stripe",
    variables: {
      colorText: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    },
  };
  useEffect(() => {}, [cs, loading]);

  useEffect(() => {
    if (!isNaN(id)) {
      dispatch(fetchPaymentInfo(id));
    }
  }, [id, dispatch]);
  console.log(loading);
  console.log(cs);

  if (!cs && loading) {
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
    <Elements stripe={stripePromise} options={{ clientSecret: cs, appearance }}>
      <CheckOutComponent />
    </Elements>
  );
};

const mapStateToProps = (state) => ({
  cs: state.payment.clientSecret,
  loading: state.payment.loading,
});

export default connect(mapStateToProps)(StripeContainer);
