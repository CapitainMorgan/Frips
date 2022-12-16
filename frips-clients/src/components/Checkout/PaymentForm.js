import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import {
  PaymentElement
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
const useStyles = makeStyles((theme) => ({
  boxShadow: {
    boxShadow: "0 1px 4px 0 rgb(197 197 197 / 50%)",
    backgroundColor: "white",
    padding: 20,
  },
}));

const PaymentForm = ({ idItem }) => {
  const [isReady, setIsReady] = useState(false);
 

  return (
    <div>
      <PaymentElement
        id="payment-element"
        onReady={() => {
          setIsReady(true);
        }}
        options={{
          wallets: {
            applePay: "auto",
            googlePay: "auto",
          },
        }}
      />
      {!isReady ? (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={100} />
        </Box>
      ) : null}
    </div>
  );
};

export default PaymentForm;
