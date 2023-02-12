import React, { useEffect, useState } from "react";

import { Box, CircularProgress } from "@material-ui/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPaymentInfo } from "../../actions";
import CheckOutComponent from "./CheckOutComponent";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51JfniQEK6bYR8YbaaWm4fKWZR0O6qG62d0wBMIC4tvaRlK5IqDJXTPwbwwkxi65mGp8MyYjF5e9hOd52KMWmy9EL0012kg008l";
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({
  cs,
  loading,
  id_Item,
  loadingPayment,
  setloadinPayment,
  classes,
  selectedId,
}) => {
  const appearance = {
    theme: "stripe",
    variables: {
      colorText: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: cs, appearance }}>
      <PaymentForm
        classes={classes}
        loadingPayment={loadingPayment}
        setloadinPayment={setloadinPayment}
        idItem={id_Item}
        selectedId={selectedId}
        key="payment-form"
      />
    </Elements>
  );
};

const mapStateToProps = (state) => ({
  cs: state.payment.clientSecret,
  loading: state.payment.loading,
});

export default connect(mapStateToProps)(StripeContainer);
