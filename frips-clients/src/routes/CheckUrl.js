import { Box, CircularProgress } from "@material-ui/core";
import _ from "lodash";
import propsTypes from "prop-types";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { getItemCreationInfo } from "../actions";

const transformStringToUrl = (string) => {
  return string
    .replaceAll("-", " ")
    .replaceAll("and", "&")
    .replaceAll(" and ", "et");
};

const checkUrl = (url, infoItem) => {
  const arrayUrl = Object.values(url);
  console.log(arrayUrl)
  console.log(infoItem)

  for (let index = 0; index < arrayUrl.length; index++) {
    const findCategory = _.find(infoItem, {
      Name: transformStringToUrl(arrayUrl[index]),
    });
    if (!findCategory) {
      return false;
    }
  }
  return true;
};

const CheckUrl = ({ itemInfo }) => {
  const location = useParams();
  const dispatch = useDispatch();
  console.log(itemInfo);

  useEffect(() => {
      dispatch(getItemCreationInfo());
    
  },[]);
  
  if (!itemInfo) {
    return(
      <Box
        style={{ backgroundColor: "#F5f5f3" }}
        display="flex"
        justifyContent="center"
        width="100%"
        height="100vh"
        alignItems="center"
      >
        <CircularProgress size={100} />
      </Box>
    )
  }
  else{
    return checkUrl(location, itemInfo.infoCategory) && itemInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/PageIntrouvable" replace />
  );
  }
};



const mapStateToProps = (state) => ({
  itemInfo:state.itemInfo.itemInfo,

});

export default connect(mapStateToProps)(CheckUrl);
