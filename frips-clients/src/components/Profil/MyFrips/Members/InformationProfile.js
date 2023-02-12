import { Box, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";

const InformationProfile = ({ account, items }) => {
  return (
    <Box display={"flex"} flexDirection="column" marginLeft={5}>
      <Typography style={{ fontSize: 16, marginBottom: 5 }}>
        {account?.Pseudo}
      </Typography>
      <Typography style={{ fontSize: 16, marginBottom: 5 }}>
        {items?.length} articles en ventes
      </Typography>

      <Rating size="large" value={account?.review} precision={0.5} readOnly />
    </Box>
  );
};

export default InformationProfile;
