import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import ItemCreate from "../components/Items/ItemCreate";

const SellerRoute = ({ user }) => {
  const location = useLocation();

  return Boolean(user?.IBAN) ? (
    <ItemCreate />
  ) : (
    <Navigate to="/member/register/Seller" state={{ from: location }} replace />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoading: state.auth.loading, // Pass loading state as a prop
});

export default connect(mapStateToProps)(SellerRoute);
