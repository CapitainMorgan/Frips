import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import ItemList from "./Items/ItemLists";
import { ThemeProvider } from "@material-ui/styles";
import ItemPreview from "./Items/itemPreview/ItemPreview";
import UserProfile from "./Profil/Profil";
import CheckOut from "./Checkout/CheckOutComponent";
import ItemCreate from "./Items/ItemCreate";
import LoginPage from "./Login/LoginPage";
import Footer from "./Footer/Footer";
import Aide from "./Footer/Aide";
import Assisstance from "./Footer/Assisstance";
import ConditionGeneral from "./Footer/ConditionG";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PrivateRoute from "../routes/PrivateRoute";
import Theme from "./NavBar/createUITheme";
import { io } from "socket.io-client";
import UserProfile from "./Profil/Profil";
import ModeratorLoginPage from "./Login/ModeratorLoginPage";




import { useTheme } from "@material-ui/core/styles";
import Conversation from "./Message/Conversation";
import Sell from "./Footer/Sell";
import Register from "./Login/UserRegister";
import { Provider, useSelector } from "react-redux";
import store from "../store/store";
import MyItems from "./Profil/MyItems";
import setAuthToken from "../utils/setAuthToken";
import {
  getItemCreationInfo,
  getUnReadNotification,
  loadUser,
  setSocket,
} from "../actions";
import UserToUser from "./Message/UserToUser";
import MyFavorite from "./Profil/MyFavorite";
import ItemEdit from "./Items/ItemEdit";
import NewMessage from "./Message/newMessage";
import DisplayCatalogue from "./Items/CatalogueDisplay/DisplayCatalogue";
import { Box } from "@material-ui/core";
import NotificationComponent from "./Profil/NotificationComponent";
import CategoryProduct from "./NavBar/CategoryProduct";
import PageNotFound from "./NavBar/PageNotFound";
import _ from "lodash";
import CheckUrl from "../routes/CheckUrl";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);

const App = () => {
  const [notification, setNotification] = useState(null);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    socket.on("connect", () => {
      store.dispatch(setSocket(socket));
    });
    socket.on("message notification", (data) => {
      if (!mobile) {
        console.log(store.getState().notification.notificationUser);
        if (
          !_.includes(
            store.getState().notification.notificationUser,
            data.id_Sender
          )
        ) {
          setNotification(data);
          store.dispatch({ type: "NOTIFICATION", payload: data });
          store.dispatch({ type: "NEW_NOTIFICATION", payload: +1 });
        }
      }
    });
    store.dispatch(loadUser(socket));

    return () => {
      socket.on("disconnect");
    };
  }, [
    store.getState().notification,
    store.getState().auth,
    store.getState().socket,
  ]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Box display={"flex"} flexDirection="column">
          <Router>
            <Header />
            <NotificationComponent notification={notification} />
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
              <Route
                path="/moderator/login"
                exact
                element={<ModeratorLoginPage />}
                key={"moderator-login"}
              />
              <Route path="/member" key={"member-management"}>
                <Route path="/member/:name" element={<div style={{height:200}}>salut</div>} />
              </Route>

              <Route path="/items" key={"items-management"}>
                <Route path="/items/:id" element={<ItemPreview />} />
                <Route
                  path="/items/allNewItems"
                  element={<DisplayCatalogue />}
                />
                <Route path="/items/edit/:id" element={<ItemEdit />} />
              </Route>

              <Route element={<PrivateRoute />} key={"private-route"}>
                <Route path="/items/new" element={<ItemCreate />} />
                <Route path="/settings/profile" element={<UserProfile />} />
                <Route path="/members/myFrips" element={<MyItems />} />
                <Route path="/member/conversation" element={<Conversation />} />
                <Route path="/member/myFavorite" element={<MyFavorite />} />
                <Route path="/member/message/:id" element={<NewMessage />} />
              </Route>

              <Route path="/" key={"root-filter"}>
                <Route index element={<ItemList />} />
                <Route element={<CheckUrl/>}>
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

              <Route path="/assisstance" exact element={<Assisstance />} />
              <Route
                path="/Condition-général-de-vente-et-politique"
                exact
                element={<ConditionGeneral />}
              />
              <Route path="/Aide/vendre" exact element={<Sell />} />
              <Route path="/Aide" exact element={<Aide />} />
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
