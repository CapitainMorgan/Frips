import { Box, IconButton, makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  Dialog: {
    width: 350,
    height: 500,
    [theme.breakpoints.down("sm")]: {
      height: 500,
      width: "auto",
    },
  },
}));

const DialogPreviewProduct = ({
  open,
  handleClose,
  images,
  index,
  setIndex,
}) => {
  const classes = useStyles();

  if (!images[0].image) {
    return null;
  }
  console.log(index);
  console.log(open);
  return (
    <div>
      <Dialog open={open}>
        <Box
          className={classes.Dialog}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Box display="flex" position="absolute" right={0} top={0}>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              style={{ backgroundColor: "transparent", color: "black" }}
              onClick={handleClose}
            >
              {" "}
              <CloseIcon color="primary" style={{ fontSize: 32 }} />{" "}
            </IconButton>
          </Box>
          <Box display="flex" height={"50%"} position="absolute" right={0}>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              style={{ backgroundColor: "transparent", color: "white" }}
              onClick={() => {
                if (index === images.length - 1) {
                  setIndex(0);
                } else {
                  setIndex(index + 1);
                }
              }}
            >
              {" "}
              <NavigateNextIcon />{" "}
            </IconButton>
          </Box>
          <Box display="flex" height={"50%"} position="absolute" left={0}>
            <IconButton
              disableRipple
              disableFocusRipple
              disableTouchRipple
              style={{ backgroundColor: "transparent", color: "white" }}
              onClick={() => {
                if (index === 0) {
                  console.log(index);
                  setIndex(images.length - 1);
                } else {
                  setIndex(index - 1);
                }
              }}
            >
              {" "}
              <NavigateBeforeIcon />{" "}
            </IconButton>
          </Box>

          <img
            src={`/images/${images[0].id_Item}/${images[index].image}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          ></img>
        </Box>
      </Dialog>
    </div>
  );
};

export default DialogPreviewProduct;
