import axios from "axios";
import _ from "lodash";
import setAuthToken from "../utils/setAuthToken";
import {
  ADD_FAVORITE,
  ADD_FILTER,
  ADD_MESSAGE_IMAGE,
  ADD_MORE_MESSAGE,
  AUTH_ERROR,
  CHANGE_PAGINATION,
  CREATE_ITEM,
  DISPATCH_HANDLECLICK,
  EDIT_ITEM,
  ERROR,
  FETCH_FILTER,
  FETCH_INFO_ITEM,
  FETCH_ITEM,
  FETCH_ITEMS,
  FETCH_ITEM_FILTER_SUCCESS,
  FETCH_ITEM_TYPE,
  FETCH_MYFAVORITE,
  FETCH_MYFAVORITEIDs,
  FETCH_MYFRIPS,
  FETCH_NEW_ITEMS,
  FETCH_NEW_ITEM_TYPE,
  GENERATE_CONV,
  GET_ALL_CONV,
  GET_CONV,
  GET_ITEM_PROPOSE,
  GET_ITEM_PROPOSE_FROMID,
  GET_MORE_ITEMS,
  GET_MORE_MESSAGE,
  GET_MORE_MESSAGE_LOADING,
  HANDLEAWAY_CLICK_FORPROPOSE,
  HANDLE_AWAYSECOND_PAGE,
  HANDLE_CLICK_FORPROPOSE,
  HANDLE_SECOND_PAGE,
  INFO_ITEM,
  LOADING_FETCH_ITEM,
  LOADING_ITEM,
  LOADING_PAYMENT,
  LOGIN_FAIL,
  LOGIN_SUCCES,
  LOGOUT,
  MESSAGE_ERROR,
  MESSAGE_LOADING,
  MSG_ERROR,
  NEW_MESSAGE,
  NO_MORE,
  NUMBER_COUNT,
  PAYMENT_FAILED,
  PAYMENT_INFO,
  PAYMENT_INFO_SUCCESS_FETCH,
  PAYMENT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REMOVE_FAVORITE,
  REMOVE_FILTER,
  SEARCH,
  SOCKET,
  SUCCESS_CREATION_ITEM,
  SUCCESS_FETCH_ITEM,
  USER_LOADED,
} from "./type";
////LOGIN/////
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const loadUser = (socket) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(getUnReadNotification());
    if (socket?.connected) {
      socket.emit("join", { userId: res.data.id, socketId: socket.id });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const setSocket = (socket) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SOCKET,
      payload: socket,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const itemViewed = (id) => async (dispatch) => {
  try {
    await axios.post("/api/items/view", { id }, config);
  } catch (error) {}
};

export const register = (values, from, history) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/user", values, config);
    console.log(data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());

    history(from);
  } catch (error) {
    //todos error handling
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const login = (values, from, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth", values, config);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCES,
      payload: res.data,
    });
    dispatch(loadUser());
    history(from, { replace: true });
  } catch (error) {
    console.log(error);
    //todos error handling
    const displayError = error.response?.data?.errors;
    if (displayError) {
      dispatch({
        type: LOGIN_FAIL,
        payload: displayError[0],
      });
    }
  }
};

export const changeImageProfile = (image) => async (dispatch, getState) => {
  try {
    const formData = new FormData();
    formData.append("singleImage", image);

    const { data } = await axios.post("/api/members/myProfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: "IMAGE_CHANGE", payload: data });
  } catch (error) {
    //todos error handling
  }
};

export const logout = (history) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  history("/");
};

////LOGIN/////*

////ITEM/////

export const createItem =
  (formValues, images, history) => async (dispatch, getState) => {
    try {
      let formData = new FormData();
      for (const key in formValues) {
        if (key === "image") {
          for (let i = 0; i < images.length; i++) {
            formData.append("image", images[i]);
          }
        }
        if (key === "Color" && key !== "image") {
          formValues.Color.forEach((element) => {
            formData.append("Color", element.id);
          });
        } else {
          formData.append(key, formValues[key]);
        }
      }

      const response = await axios.post("/api/items", formData);

      dispatch({ type: CREATE_ITEM, payload: response.data });
      dispatch({ type: SUCCESS_CREATION_ITEM, payload: true });
      // history("/")
    } catch (error) {
      console.log(error);
      dispatch({ type: SUCCESS_CREATION_ITEM, payload: false });
    }
    //
  };

export const fetchItems = (fromHome) => async (dispatch, getState) => {
  const isAuthenticated = getState().auth.isAuthenticated;

  try {
    
      const { data } = await axios.get("/api/items");
      dispatch(fetchNewItems());
      dispatch({ type: LOADING_FETCH_ITEM });
      dispatch({ type: FETCH_ITEMS, payload: data });
      dispatch({ type: SUCCESS_FETCH_ITEM });
    
  } catch (error) {}
};

export const fetchNewItems = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/items/new");
    dispatch({ type: LOADING_FETCH_ITEM });
    dispatch({ type: FETCH_NEW_ITEMS, payload: data });
    dispatch({ type: SUCCESS_FETCH_ITEM });
  } catch (error) {}
};

export const fetchMoreItems = (number) => async (dispatch, getState) => {
  const { data } = await axios.post(`/api/items/more`, { number: number });

  dispatch({ type: GET_MORE_ITEMS, payload: data });
};

export const fetchMyfrips = () => async (dispatch, getState) => {
  try {
    dispatch({type:"LOADING_MYFRIPS"})
    const { data } = await axios.get(`/api/members/myFrips`);
    dispatch({ type: FETCH_MYFRIPS, payload: data });
    dispatch({type:"SUCCESS_FETCH_MYFRIPS"})
  } catch (error) {
    alert(error)
  }
};

export const fetchItem = (id) => async (dispatch) => {
  try {
    dispatch({type:LOADING_FETCH_ITEM})
  const response = await axios.get(`/api/items/${id}`);
  dispatch({ type: FETCH_ITEM, payload: response.data });
  dispatch({type:SUCCESS_FETCH_ITEM})
  } catch (error) {
    
  }
};

export const editItem = (id, formValues) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_ITEM" });
    const response = await axios.get(`/api/edit/${id}`);

    for (let index = 0; index < response.data.image.length; index++) {
      const blob = await (
        await fetch(`/images/${id}/${response.data.image[index].image}`)
      ).blob();
      response.data.image[index] = new File(
        [blob],
        `${response.data.image[index].image}`,
        { type: blob.type }
      );
    }

    dispatch({ type: EDIT_ITEM, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const editItemSend =
  (formValues, images, history, id) => async (dispatch) => {
    try {
      let formData = new FormData();
      for (const key in formValues) {
        if (key === "image") {
          for (let i = 0; i < images.length; i++) {
            formData.append("image", images[i]);
          }
        }
        if (key === "Color" && key !== "image") {
          formValues.Color.forEach((element) => {
            formData.append("Color", element.id);
          });
        } else {
          formData.append(key, formValues[key]);
        }
      }

      formData.append("id_Item", id);

      const response = await axios.post("/api/edit", formData);
    } catch (error) {
      console.log(error);
    }
  };

////ITEM/////*

////MESSAGE/////

export const getItemForPropse = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/api/items/ItemForPorpose", { id: id });

    dispatch({ type: GET_ITEM_PROPOSE, payload: data });
  } catch (error) {}
};

export const getItemForPropseFromId = () => async (dispatch, getState) => {
  const item = getState().items.UniqueItem;

  try {
    dispatch({ type: GET_ITEM_PROPOSE_FROMID, payload: item });
  } catch (error) {}
};

export const handleClickPropose = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DISPATCH_HANDLECLICK });
    dispatch({ type: HANDLE_CLICK_FORPROPOSE });
  } catch (error) {}
};

export const handleClickAwayPropose = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DISPATCH_HANDLECLICK });

    dispatch({ type: HANDLEAWAY_CLICK_FORPROPOSE });
  } catch (error) {}
};

export const sendMessage =
  (Text, chat_id, id_Receiver, id_Sender, item, Price) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(Price);

    let messageAdded;

    try {
      if (Text) {
        messageAdded = {
          Text,
          chat_id,
          id_Receiver,
          id_Sender,
          Date_Hour: new Date().toISOString(),
          item: null,
        };

        await axios.post(
          "/api/conversation/myConversation/newMessage",
          {
            Text,
            chat_id,
            id_Receiver: id_Receiver,
            id_Item: null,
            Price: null,
          },
          config
        );
      } else {
        messageAdded = {
          Text,
          chat_id,
          id_Receiver,
          id_Sender,
          Date_Hour: new Date().toISOString(),
          item: {
            Price: item.Price,
            id: item.id,
            pricepropose: [{ Price }],
            image: [{ image: item.image.image }],
          },
        };
        await axios.post(
          "/api/conversation/myConversation/newMessage",
          { Text, chat_id, id_Receiver: id_Receiver, id_Item: item.id, Price },
          config
        );
      }
      dispatch(addMessage(messageAdded));
    } catch (error) {
      console.log(error);
    }
  };

export const newConv = (id, item, history) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(item)
  try {
    const response = await axios.post("/api/conversation", { id: id }, config);
    dispatch({ type: GENERATE_CONV, payload: response.data });

    if (response) {
      dispatch(getItemForPropseFromId());
      history(`/member/message/${response.data.id}`,{state:item});
    }
  } catch (error) {}
};

export const getUnReadNotification = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/conversation/unReadNotification`);
    dispatch({ type: "UNREAD_NOTIFICATION", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const handleNotificaiton =
  (notification) => async (dispatch, getState) => {
    const notif = getState().notification.unReadNotification;

    const { id_Chat } = notification;
    try {
      if (!_.find(notif, { id: id_Chat })) {
        dispatch({ type: "NEW_NOTIFICATION", payload: { id: id_Chat } });
      }

      dispatch({ type: "UPDATE_MESSAGE", payload: notification });
    } catch (error) {}
  };

export const readMessage = (id_Chat) => async (dispatch, getState) => {
  try {
    await axios.put(`/api/conversation/updateMessage`, { id_Chat });
    dispatch({ type: "READ_CONVERSATION", payload: { id: id_Chat } });

    dispatch({ type: "CLEAR_NOTIFICATION", payload: id_Chat });
  } catch (error) {
    console.log(error);
  }
};

export const sendPropose = (Price,idItem) => async (dispatch, getState) => {
  try {
    await axios.put(`/api/items/proposition`, { Price,idItem });
    
  } catch (error) {
    console.log(error);
  }
};


export const getConv = (id) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_LOADING });
    const response = await axios.get(`/api/conversation/myConversation/${id}`);
    dispatch({ type: GET_CONV, payload: response.data });
    dispatch({ type: "MESSAGE_FETCH_SUCCESS" });
  } catch (error) {
    dispatch({ type: MSG_ERROR });
  }
};

export const getAllConv = () => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_LOADING });

    const response = await axios.get(`/api/conversation/myConversation`);

    dispatch({ type: GET_ALL_CONV, payload: response.data });
    dispatch({ type: "MESSAGE_FETCH_SUCCESS" });
  } catch (error) {}
};

export const receivedNewMessage = (value) => async (dispatch) => {
  try {
    dispatch({ type: NEW_MESSAGE, payload: value });
  } catch (error) {
    console.log(error);
  }
};

export const addMessage =
  (text, options = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_MORE_MESSAGE, payload: text });
    } catch (error) {
      dispatch({ type: MSG_ERROR });
    }
  };

export const moreMessageLoading = () => async (dispatch, getState) => {
  setTimeout(() => {
    dispatch({ type: GET_MORE_MESSAGE_LOADING });
  }, 1000);
};

export const getMoreMessage = (id, number) => async (dispatch, getState) => {
  moreMessageLoading();
  try {
    const { data } = await axios.post(
      `/api/conversation/myConversation/${id}`,
      { number: number }
    );

    if (data.length === 0) {
      dispatch({ type: NO_MORE });
    } else {
      dispatch({ type: GET_MORE_MESSAGE, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: MESSAGE_ERROR });
  }
};

/////////*********FAVORITE ************//////////

const updateItemsList = (key, getState) => {
  switch (key) {
    case 0:
      return getState().items.items;
    case 1:
      return getState().favoriteReducers.favoritItem;
    case 2:
      return getState().items.UniqueItem.userItem;
    case 3:
      return getState().items.UniqueItem.findedSimilarProduct;
    case 4:
      return getState().items.newItem;
    case 5:
      return getState().filterCatalogue.items;

    default:
      return getState().items.items;
  }
};
export const addFavorite = (id, fromFavorite) => async (dispatch, getState) => {
  const items = updateItemsList(fromFavorite, getState);
  console.log(items)

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const addId = { id };

  try {
    for (const [index, val] of items.entries()) {
      console.log(id);
      console.log(val.id === id);
      if (val.id === id) {
        val._count.favorit = val._count.favorit + 1;
        break;
      }
    }
    dispatch({ type: ADD_FAVORITE, payload: { id_Item: id } });

    await axios.post(`/api/items/favorit`, JSON.stringify(addId), config);
  } catch (error) {
    console.log(error);
  }
};

export const removeFavorite =
  (id, fromFavorite) => async (dispatch, getState) => {
    const items = updateItemsList(fromFavorite, getState);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const addId = { id };

    try {
      for (const [index, val] of items.entries()) {
        console.log(val);
        if (val.id === id && val._count.favorit > 0) {
          val._count.favorit = val._count.favorit - 1;
          break;
        }
      }
      dispatch({ type: REMOVE_FAVORITE, payload: { id_Item: id } });
      await axios.delete(`/api/items/favorit`, { data: addId }, config);
    } catch (error) {
      console.log(error);
    }
  };

export const fetchMyFavorite = (pagination) => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_FAVORITE" });
    const { data } = await axios.post(`/api/items/favorit/all`, { pagination });
    dispatch({ type: FETCH_MYFAVORITE, payload: data.items });
    dispatch({ type: NUMBER_COUNT, payload: data.count });
    dispatch(idFavorite());
    dispatch({ type: "FETCH_FAVORITE_SUCCESS" });
  } catch (error) {}
};

export const idFavorite = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/items/Id_of_MyFavorite");
    dispatch({ type: FETCH_MYFAVORITEIDs, payload: data });
  } catch (error) {}
};

///FILTER ITEM ///

export const filterCatalogue = (number) => async (dispatch) => {
  //const response = await axios.get(`/api/items/Id_of_MyFavorite`)

  try {
    dispatch({ type: FETCH_FILTER });
    const { data } = await axios.get("/api/items/filterCataloguePagination");
    dispatch({ type: FETCH_ITEM_TYPE, payload: data });
  } catch (error) {}
};

export const addToFilter = (value, label) => async (dispatch, getState) => {
  let data = { label, value };

  try {
    if (_.includes(getState().filterCatalogue.AllFilter[label], value)) return;
    else {
      dispatch({ type: FETCH_FILTER });
      dispatch({ type: ADD_FILTER, payload: data });
    }
  } catch (error) {}
};

export const removeToFilter = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_FILTER });

    dispatch({ type: REMOVE_FILTER, payload: value });
  } catch (error) {
    console.log(error);
  }
};

export const paginationForFilter = () => async (dispatch, getState) => {
  const number = getState().filterCatalogue.pagination;
  const AllFilter = getState().filterCatalogue.AllFilter;

  let newItemsDisplay;
  let numberCount;
  let { Catalogue, Couleur, Marque, Price, Etat, sortedBy, Search } = AllFilter;
  let newCatalogue = [];
  let newCouleur = [];
  let newMarque = [];
  let newEtat = [];
  let itemsId = [];

  if (
    AllFilter.Catalogue.length !== 0 ||
    AllFilter.Couleur.length !== 0 ||
    AllFilter.Marque.length !== 0 ||
    AllFilter.Etat.length !== 0
  ) {
    Catalogue.forEach((element) => {
      console.log(element);
      newCatalogue.push(element.id);
    });
    Couleur.forEach((element) => {
      newCouleur.push(element.id);
    });
    Marque.forEach((element) => {
      newMarque.push(element.id);
    });
    Etat.forEach((element) => {
      newEtat.push(element.id);
    });
  }

  try {
    dispatch({ type: FETCH_FILTER });
    const { data } = await axios.post("/api/items/pagination", {
      number,
      newCatalogue,
      newCouleur,
      newMarque,
      newEtat,
      Price,
      itemsId,
      sortedBy,
    });
    newItemsDisplay = [...data.items];
    numberCount = data.count;

    dispatch({
      type: FETCH_NEW_ITEM_TYPE,
      payload: { items: newItemsDisplay, count: numberCount },
    });
    dispatch({ type: FETCH_ITEM_FILTER_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};

export const addFilterFromSearch =
  (string, findElement, history) => async (dispatch, getState) => {
    const splitArray = string.split(/\b(?:a|the|was|\s)+\b/i);
    const array = getState().itemInfo.Search;
    const combineArray = [...array[0], ...array[1]];
    const fakeNumber = 1001;
    console.log(combineArray);

    try {
      dispatch({ type: "RESTORE" });
      if (findElement) {
        splitArray.forEach((element) => {
          if (_.find(array[1], { Name: element })) {
            dispatch(
              addToFilter(_.find(array[1], { Name: element }), "Catalogue")
            );
          }
          if (_.find(array[0], { Name: element })) {
            dispatch(
              addToFilter(_.find(array[0], { Name: element }), "Marque")
            );
          }
        });
        history(`/filter`);
      }
      console.log(history);
    } catch (error) {
      alert(error);
    }
  };

export const changePagination = (number) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHANGE_PAGINATION, payload: number });
  } catch (error) {}
};


export const getItemCreationInfo = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_INFO_ITEM });
    const { data } = await axios.get("/api/infoItem/info");

    dispatch({ type: INFO_ITEM, payload: data });
    dispatch({ type: "FETCH_INFO_ITEM_SUCCESS" });
  } catch (error) {}
};

export const getInfoSearch = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_INFO_ITEM });
    const { data } = await axios.get("/api/infoItem/search");
    dispatch({ type: SEARCH, payload: data });
    dispatch({ type: "FETCH_INFO_ITEM_SUCCESS" });
  } catch (error) {}
};

export const displayError = (error) => async (dispatch, getState) => {
  try {
    dispatch({ type: ERROR, payload: error });
  } catch (error) {}
};

export const handleClickSecondPage = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: HANDLE_SECOND_PAGE, payload: item });
  } catch (error) {}
};

export const handleClickAwaySecondPage =
  (error) => async (dispatch, getState) => {
    try {
      dispatch({ type: HANDLE_AWAYSECOND_PAGE });
    } catch (error) {}
  };

export const addMessageImage = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_MESSAGE_IMAGE, payload: item });
    dispatch(handleClickAwayPropose());
  } catch (error) {}
};

export const fetchPaymentInfo = (idItem,) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_PAYMENT});
   const {data} = await axios.post("/api/paymentIntent/createCheckoutPayment",{idItem }, config);
    console.log(data) 
   dispatch({type:PAYMENT_INFO,payload:data})
   dispatch({type:PAYMENT_INFO_SUCCESS_FETCH})


  } catch (error) {
    dispatch({type:PAYMENT_FAILED})
  }
};


export const addFilterFrips = (id) => async (dispatch, getState) => {
  try {
  dispatch({type:"ADD_FILTER_MYFRIPS",payload:id})

  } catch (error) {
  }
};

export const MyFripsFilterChange = (page,)=>{

}

export const sendSuccessFullPayment = (id ) => async (dispatch,getSate) =>{
  try {
    
  } catch (error) {
    
  }
}

export const requestPayment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_PAYMENT});
    const { data } = await axios.post("/api/paymentIntent/info",{ id }, config);
    console.log(data)

  } catch (error) {
    dispatch({type:PAYMENT_FAILED})
  }
};


