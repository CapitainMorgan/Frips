import {
  Box, makeStyles, MenuItem, Popper, Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Catalogue } from "../Items/staticItems/staticItemName";
import ClickAwayListener from "../SpecialComponent/ClickAwayListener";
const useStyles = makeStyles((theme) => ({
  fakeBox: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    width:"100vh",  },
  BoxShadow: {
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    backgroundColor: "white",
  },
}));

let thirdQuery;

const SubHeaderNavigation = ({ category, transformStringToUrl }) => {
  const history = useNavigate();
  const dispatch = useDispatch()

  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);
  const [indexItem, setIndex] = useState(0);

  let secondQuery = "/" + Catalogue[0].subitems[indexItem].Name;

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClickAway = (e) => {

    setAnchor(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box width={"50%"}>
        <Box
          color="primary"
          style={{ fontSize: 16, color: "black" }}
          className={classes.fakeBox}
          onClick={handleClick}
        >
          <Typography style={{ fontSize: 16, color: "black" }}>
            Femme
          </Typography>

          <Popper
            disablePortal={false}
            style={{ width: "65%" }}
            popperOptions={{ positionFixed: true }}
            anchorEl={anchor}
            placement="bottom"
            open={Boolean(anchor)}
          >
            <Box
              position="absolute"
              className={classes.BoxShadow}
              top={0}
              marginTop={1.5}
              left={15}
              width={"100%"}
              display="flex"
            >
              <Box width={"30%"} display="flex" flexDirection="column">
                {Catalogue[0].subitems.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      style={{ height: 50, fontSize: 16 }}
                      onClick={() => {
                        secondQuery = "/" + item.label;
                        setIndex(index);
                      }}
                    >
                      {item.Name}
                    </MenuItem>
                  );
                })}
              </Box>
              <Box  width={"70%"}>
                <Box display="grid" gridTemplateColumns="repeat(2,50%)">
                  {Catalogue[0].subitems[indexItem].subitems.map(
                    (item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          disableTouchRipple
                          disableGutters
                          style={{ height: 50, fontSize: 16,color:"black" }}
                          onClick={(e) => {
                            thirdQuery = "/" + transformStringToUrl(item.Name);
                            handleClickAway(e);
                            history("/Femme" + secondQuery + thirdQuery);
                          }}
                        >
                          {item.Name}
                        </MenuItem>
                      );
                    }
                  )}
                </Box>
              </Box>
            </Box>
          </Popper>
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default SubHeaderNavigation;
