import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import PrivateRoute from "../routes/PrivateRoute";
import Footer from "./Footer/Footer";
import Header from "./Header";
import ItemCreate from "./Items/ItemCreate";
import ItemList from "./Items/ItemLists";
import ItemPreview from "./Items/itemPreview/ItemPreview";
import LoginPage from "./Login/LoginPage";
import Theme from "./NavBar/createUITheme";
import UserProfile from "./Profil/Profil";

import { Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import _ from "lodash";
import { Provider } from "react-redux";
import {
  getAllConv,
  getItemCreationInfo,
  handleNotificaiton,
  idFavorite,
  loadUser,
  setSocket,
} from "../actions";
import API_ENDPOINT from "../api/url";
import CheckUrl from "../routes/CheckUrl";
import SellerRoute from "../routes/SellerRoute";
import store from "../store/store";
import setAuthToken from "../utils/setAuthToken";
import "./App.css";
import CheckOutComponent from "./Checkout/CheckOutComponent";
import StatusPaymentComponent from "./Checkout/StatusPaymentComponent";
import DisplayCatalogue from "./Items/CatalogueDisplay/DisplayCatalogue";
import ItemEdit from "./Items/ItemEdit";
import Register from "./Login/UserRegister";
import Conversation from "./Message/Conversation";
import NewMessage from "./Message/newMessage";
import PageNotFound from "./NavBar/PageNotFound";
import MyFavorite from "./Profil/MyFavorite";
import MemberProfile from "./Profil/MyFrips/Members/MemberProfile";
import MyFrips from "./Profil/MyFrips/MyFrips";
import MySellById from "./Profil/MyFrips/MySell/MySellById";
import NotificationComponent from "./Profil/NotificationComponent";
import RegisterSeller from "./Profil/RegisterSeller";
import ConditionGeneral from "./Footer/Help/ConditionGeneral";
import Aide from "./Footer/Help/Aide";
import MyPropositionById from "./Profil/MyFrips/MyProposition/MyPropositionById";
import SellInfo from "./Footer/Help/SellInfo";
import BuyInfo from "./Footer/Help/BuyInfo";
import AccountInfo from "./Footer/Help/AccountInfo";
import PaymentInfo from "./Footer/Help/PaymentInfo";
import Dashboard from "../admin/Dashboard";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const socket = io(API_ENDPOINT, { reconnection: true,autoConnect:true });

const App = () => {
  const [notification, setNotification] = useState(null);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    store.dispatch(idFavorite());

    socket.on("connect", () => {
      store.dispatch(setSocket(socket));
      store.dispatch(loadUser(socket));
      store.dispatch(getAllConv());
      store.dispatch(getItemCreationInfo());
    });
    socket.on("message notification", (data) => {
      if (!mobile) {
        if (
          !_.includes(
            store.getState().notification.notificationUser,
            data.id_Sender
          )
        ) {
          setNotification(data);
          store.dispatch({ type: "NOTIFICATION", payload: data });
        }
        store.dispatch(handleNotificaiton(data));
      }
    });

    return () => {
      socket.on("disconnect");
    };
  }, [
    store.getState().notification.unReadNotification,
    store.getState().auth,
    store.getState().socket,
  ]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Box
          display={"flex"}
          flexDirection="column"
          height={"100vh"}
          style={{ backgroundColor: "#F5f5f3" }}
        >
          <Router>
            <Header />
            <NotificationComponent
              mobile={mobile}
              notification={notification}
            />
            <Routes>
              <Route
                path="/signup"
                exact
                element={<Register />}
                key={"signUp"}
              />
              <Route
                path="/login"
                exact
                element={<LoginPage />}
                key={"login"}
              />
              <Route path="/member" key={"member-management"}>
                <Route path="/member/:name" element={<MemberProfile />} />
              </Route>
              <Route path="/Condition-général-de-vente-et-politique" element={<ConditionGeneral />} />"

              <Route path="/items" key={"items-id"}>
                <Route path="/items/:id" element={<ItemPreview />} />
                <Route
                  path="/items/allNewItems"
                  element={<DisplayCatalogue />}
                />
              </Route>

              <Route element={<PrivateRoute />} key={"private-route"}>
                <Route path="/settings/profile" element={<UserProfile />} />
                <Route path="/members/myFrips" element={<MyFrips />} />
                <Route path="/members/myFrips/:url" element={<MyFrips />} />

                <Route
                  path="/members/myFrips/mySell/:id"
                  element={<MySellById />}
                />

                <Route
                  path="/members/myFrips/myProposition/:id"
                  element={<MyPropositionById />}
                />

                <Route path="/member/conversation" element={<Conversation />} />
                <Route path="/member/myFavorite" element={<MyFavorite />} />
                <Route path="/member/message/:id" element={<NewMessage />} />
                <Route
                  path="/member/register/Seller"
                  element={<RegisterSeller />}
                />

                <Route path="/items/edit/:id" element={<ItemEdit />} />

                <Route path="/payment/:id" element={<CheckOutComponent />} />
                <Route
                  path="/payment/:id/paymentStatus"
                  element={<StatusPaymentComponent />}
                />
              </Route>

              <Route element={<SellerRoute />} key={"seller-route"}>
                <Route
                  path="/items/new"
                  caseSensitive={false}
                  element={<ItemCreate />}
                />
              </Route>
              <Route path="/filter" element={<DisplayCatalogue />} />

              <Route path="/" key={"root-filter"}>
                <Route index element={<ItemList />} />

                <Route element={<CheckUrl />}>
                  <Route path=":upCategory" element={<DisplayCatalogue />}>
                    <Route path=":category" element={<DisplayCatalogue />}>
                      <Route
                        path=":subCategory"
                        element={<DisplayCatalogue />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Route>

              <Route
                path="/Condition-général-de-vente-et-politique"
                exact
                element={<ConditionGeneral />}
              />
                 <Route
                  path="/admin"
                  element={<Dashboard />}
                />
              <Route path="/aide" element={<Aide />} />
              <Route path="/aide/paymentInfo" element={<PaymentInfo />} />
              <Route path="/aide/sellInfo" element={<SellInfo />} />
              <Route path="/aide/buyInfo" element={<BuyInfo />} />

              <Route path="/aide/accountInfo" element={<AccountInfo />} />

              <Route path="*" element={<PageNotFound />} />
              <Route path="/PageIntrouvable" element={<PageNotFound />} />
            </Routes>
            {!mobile ? <Footer /> : null}
          </Router>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
