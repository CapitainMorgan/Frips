import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { RadioButtonCheckedRounded } from "@material-ui/icons";
import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";



const useStyles = makeStyles((theme) => ({
    pointer: {
        cursor: "pointer",
      },
      BoxItem: (props) => ({
        "&:hover": {
          background: props.hoverColor,
        },
        display: "flex",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
    
      }),
      Typography: {
        fontWeight: 500,
        fontSize: 16,
      },
    
      checkBox: {
        position: "absolute",
        "&:hover": {
          background: "transparent",
        },
        right: 0,
        top: 0,
      },
    DeliveryBox: {
      display: "flex",
      width: "100%",
  
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        display:"flex",
        flexDirection:"column"
      },
    },
  }));

const DeliveryFormRadio = ({
  field,
  form,
  mobile,
  size,
  setSize,
  ...props
}) => {
  const classes = useStyles();
  const DeliveryInfo = useSelector(
    (state) => state.itemInfo.itemInfo?.infoDelivery
  );


  if(DeliveryInfo?.length===0)return;

  const renderDeliveryMethods = (arrayDelivery) => {
    return arrayDelivery?.map((item) => {
      return (
        <Box
          className={classes.BoxItem}
          border={3}
          padding={2}
          width="100%"
          margin={1}
          borderColor={
            _.includes(form.values.Delivery, item.id) ? "#82A0C2" : "#9E9E9E"
          }
          borderRadius={20}
          marginBottom={2}
          onClick={() => {
            if (_.includes(form.values.Delivery, item.id)) {
              form.setFieldValue(
                "Delivery",
                form.values.Delivery.filter((value) => value !== item.id)
              );
            } else {
              form.setFieldValue("Delivery", [
                ...form.values.Delivery,
                item.id,
              ]);
            }
          }}
        >
          <Box display={"flex"} >
            <Typography className={classes.Typography}>{item.Name}</Typography>
          </Box>
          <Box marginLeft={2} display="flex" alignItems={"center"} flexDirection="column">
            <Typography style={{  fontWeight: 700}} className={classes.Typography}>
              {Boolean(item.Price) ? `${ item.Price} CHF` : "gratuit"}
            </Typography>
          </Box>
          <Radio
            className={classes.checkBox}
            style={{ backgroundColor: "transparent" }}
            checked={_.includes(form.values.Delivery, item.id)}
            color="primary"
            disableFocusRipple
            disableRipple
            disableTouchRipple
          />
        </Box>
      );
    });
  };

  return <Box className={classes.DeliveryBox}>{renderDeliveryMethods(DeliveryInfo)}</Box>;
};

export default DeliveryFormRadio;