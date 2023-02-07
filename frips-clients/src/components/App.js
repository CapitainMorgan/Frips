import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import PrivateRoute from "../routes/PrivateRoute";
import Aide from "./Footer/Aide";
import Assisstance from "./Footer/Assisstance";
import ConditionGeneral from "./Footer/ConditionG";
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
  getAllConv, getItemCreationInfo, handleNotificaiton,
  loadUser,
  setSocket
} from "../actions";
import CheckUrl from "../routes/CheckUrl";
import store from "../store/store";
import setAuthToken from "../utils/setAuthToken";
import Sell from "./Footer/Sell";
import DisplayCatalogue from "./Items/CatalogueDisplay/DisplayCatalogue";
import ItemEdit from "./Items/ItemEdit";
import Register from "./Login/UserRegister";
import Conversation from "./Message/Conversation";
import NewMessage from "./Message/newMessage";
import PageNotFound from "./NavBar/PageNotFound";
import MyFavorite from "./Profil/MyFavorite";
import MyFrips from "./Profil/MyFrips/MyFrips";
import NotificationComponent from "./Profil/NotificationComponent";
import "./App.css"
import StripeContainer from "./Checkout/StripeContainer";
import StatusPaymentComponent from "./Checkout/StatusPaymentComponent";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const ENDPOINT = "http://localhost:5000/";
const socket = io(ENDPOINT);

const App = () => {
  const [notification, setNotification] = useState(null);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  
  useEffect(() => {
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
        <Box display={"flex"} flexDirection="column" height={"100vh"} style={{backgroundColor:"#F5f5f3"}}>
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
              <Route path="/member" key={"member-management"}>
                <Route path="/member/:name" element={<div style={{height:200}}>salut</div>} />
              </Route>

              

              <Route path="/items" key={"items-id"}>
                <Route path="/items/:id" element={<ItemPreview />} />
                <Route
                  path="/items/allNewItems"
                  element={<DisplayCatalogue />}
                />

              </Route>

              <Route element={<PrivateRoute />} key={"private-route"}>
                <Route path="/items/new" caseSensitive={false} element={<ItemCreate />} />
                <Route path="/settings/profile" element={<UserProfile />} />
                <Route path="/members/myFrips" element={<MyFrips />} />
                <Route path="/member/conversation" element={<Conversation />} />
                <Route path="/member/myFavorite" element={<MyFavorite />} />
                <Route path="/member/message/:id" element={<NewMessage />} />
                <Route path="/items/edit/:id" element={<ItemEdit />} />
                <Route path="/items/offer/:id" element={<div style={{height:200}}>salut</div>} />
                <Route path="/payment/:id" element={<StripeContainer />} />
                <Route path="/payment/:id/paymentStatus" element={<StatusPaymentComponent />} />

              </Route>
              <Route path="/filter" element={<DisplayCatalogue />}/>
                

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
