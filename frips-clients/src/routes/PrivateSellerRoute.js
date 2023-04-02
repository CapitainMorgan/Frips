import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import SellerRoute from "./SellerRoute";
import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";

const withAuth = (WrappedComponent) => (props) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const previousLocation = useSelector(
    (state) => state.location.previousLocation
  );
  const [userLoaded, setUserLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      setUserLoaded(true);
    }
  }, [user, loading]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(previousLocation, { state: { isFromSeller: location } });
    }
  }, [isAuthenticated]);

  if (!userLoaded) {
    return null;
  }

  return <WrappedComponent {...props} user={user} />;
};

const PrivateSellerRoute = withAuth(SellerRoute);

export default PrivateSellerRoute;
