import _ from "lodash";
import {
  ADD_FILTER_MYFRIPS,
  CHANGE_PAGINATION_MYFRIPS,
  DELIVERY,
  FETCH_MYFRIPS,
  FETCH_MYPURCHASE,
  FETCH_MYSELL,
  FETCH_MYSELLBYID,
  FETCH_PROPOSITION,
  GET_NOTIFICATION,
  LOADING_MYFRIPS,
  RECEIVED,
  REMOVE_NOTIFICATION_MYFRIPS,
  RESET_FILTER_MYFRIPS,
  REVIEW,
  STATUS_PROPOSITION,
  SUCCESS_FETCH_MYFRIPS,
} from "../actions/type.js";

const initialValues = {
  loading: false,
  items: [],
  delivery: [],
  proposition: [],
  sell: [],
  item:null,
  purchase: [],
  filter: [],
  sellNotification: [],
  purchaseNotifcation:[],
  propositionNotification: [],
  pagination: 1,
  msg: "",
  count: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_MYFRIPS:
      return {
        ...state,
        items: payload.items,
        count: payload.count,
        msg:payload.msg
      };
      case FETCH_MYSELLBYID:
        return {
          ...state,
          item:{
            id_transaction:payload.id,
            ...payload.item,
            DateSell: new Date(payload.DateSell),
          DateSend: payload.DateSend,
          
          Price: payload.Price,
          Price_Fees: payload.Price - payload.Price,
          review:payload.review,
          buyerAccount:payload.account,
          Status:payload.Status,
          }
        }
 
    case FETCH_MYSELL:
      const sellArray = payload.items.map(
        ({ item, DateSell, DateSend, account, Price, Status, id, review }) => ({
          id_transaction: id,
          ...item,
          DateSell: new Date(DateSell),
          DateSend: DateSend,
          
          Price: item.Price,
          Price_Fees: Price - item.Price,
          review,
          buyerAccount:account,
          Status,
        })
      );
      return {
        ...state,
        sell: sellArray,
        count: payload.count,
        msg: payload.msg,
      };
    case FETCH_MYPURCHASE:
      const purchaseArray = payload.items.map(
        ({ item, DateSell, DateSend, account, Price, Status, id, review }) => ({
          id_transaction: id,
          ...item,
          DateSell: new Date(DateSell),
          DateSend: DateSend,
          review,
          buyerAccount:account,
          Price: item.Price,
          Price_Fees: Price - item.Price,
          Status,
        })
      );
      return {
        ...state,
        purchase: purchaseArray,
        count: payload.count,
        msg: payload.msg,
      };

    case FETCH_PROPOSITION:
      const propositionArray = payload.items.map(
        ({
          item,
          dateApprove,
          SendDate,
          id_Account,
          Price,
          Approve,
          review,
        }) => ({
          ...item,
          pricepropose: Price,
          dateApprove,
          SendDate,
          id_Account,
          review,
          Approve,
        })
      );
      return {
        ...state,
        proposition: [...propositionArray],
        count: payload.count,
      };
    case CHANGE_PAGINATION_MYFRIPS:
      return {
        ...state,
        pagination: payload,
      };
    case LOADING_MYFRIPS:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_FETCH_MYFRIPS:
      return {
        ...state,
        loading: false,
      };
    case ADD_FILTER_MYFRIPS:
      if (_.includes(state.filter, payload)) {
        const removedItems = _.remove(state.filter, (id) => {
          return id !== payload;
        });
        return {
          ...state,
          filter: [...removedItems],
        };
      } else {
        return {
          ...state,
          filter: [...state.filter, payload],
        };
      }
    case REMOVE_NOTIFICATION_MYFRIPS:
      if (_.includes(state.propositionNotification, payload)) {
        const removedItems = _.remove(state.propositionNotification, (id) => {
          return id !== payload;
        });
        return {
          ...state,
          propositionNotification: [...removedItems],
        };
      }
    // eslint-disable-next-line no-fallthrough
    case GET_NOTIFICATION:
      return {
        ...state,
        propositionNotification: [...payload.resultsProposition],
        sellNotification: [...payload.resultsSell],
        purchaseNotifcation:[...payload.resultsPurchase]
      };
    case STATUS_PROPOSITION:
      return {
        ...state,
        items: [...payload],
      };

    case RESET_FILTER_MYFRIPS:
      return {
        ...state,
        filter: [],
        msg: "",
        count: null,
      };

    case DELIVERY:
      const updatedData = state.sell.map((item) => {
        if (item.id === payload) {
          return { ...item, DateSend: new Date() };
        }
        return item;
      });

      return {
        ...state,
        sell: [...updatedData],
      };

    case RECEIVED:
      const updatedDataReceived = state.sell.map((item) => {
        if (item.id === payload) {
          return { ...item, Status: "envoyé" };
        }
        return item;
      });
      return {
        ...state,
        purchase: [...updatedDataReceived],
      };
    case REVIEW:
      return {
        ...state,
      };

    default:
      return state;
  }
};
