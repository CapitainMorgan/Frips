import propsTypes from "prop-types";
import React from "react";
import { connect, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const SellerRoute = () => {
  let location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading,user } = auth;
  if (loading) {
    return null;
  }


  return isAuthenticated && !loading && !Boolean(user?.IBAN) ? (
    <Outlet />
  ) : (
    <Navigate to="/member/register/Seller" state={{ from: location }} replace />
  );
};

SellerRoute.propsTypes = {
  auth: propsTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SellerRoute);
