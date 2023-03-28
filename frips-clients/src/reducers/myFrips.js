import _ from "lodash";
import {
  ADD_FILTER_MYFRIPS,
  CHANGE_PAGINATION_MYFRIPS,
  DELIVERY,
  FETCH_MYFRIPS,
  FETCH_MYPROPOSITIONID,
  FETCH_MYPURCHASE,
  FETCH_MYSELL,
  FETCH_MYSELLBYID,
  FETCH_PROPOSITION,
  GET_NOTIFICATION,
  LOADING_MYFRIPS,
  RECEIVED,
  REMOVE_ITEM,
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
  propositionId:null,
  sell: [],
  sellId:null,
  item: null,
  purchase: [],
  purchaseId:null,
  filter: [],
  sellNotification: [],
  purchaseNotification: [],
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
        msg: payload.msg,
      };
    case FETCH_MYSELLBYID:
      return {
        ...state,
        item: {
          id_transaction: payload.id,
          ...payload.item,
          DateSell: new Date(payload.DateSell),
          DateSend: payload.DateSend,

          Price: payload.Price,
          Price_Fees: payload.item.Price - payload.Price,
          review: payload.review,
          buyerAccount: payload.account,
          Status: payload.Status,
        },
      };

    case FETCH_MYSELL:
      const sellArray = payload.items.map(
        ({
          item,
          DateSell,
          DateSend,
          account,
          Price,
          Status,
          id,
          review,
          DeliveryPrice,
          TaxPrice,
        }) => ({
          id_transaction: id,
          ...item,
          DateSell: new Date(DateSell),
          DateSend: DateSend,
          DeliveryPrice,
          Price: item.Price,
          Price_Fees: TaxPrice,
          review,
          buyerAccount: account,
          Status,
        })
      );
      return {
        ...state,
        sell: sellArray,
        count: payload.count,
        msg: payload.msg,
      };
    case REMOVE_ITEM:
      const filterArray = state.items.filter((item)=>{
        return item.id !== payload
      })

      return {
        ...state,
        items:[...filterArray]
      }
     
    case FETCH_MYPURCHASE:
      const purchaseArray = payload.items.map(
        ({
          item,
          DateSell,
          DateSend,
          account,
          Price,
          Status,
          id,
          review,
          DeliveryPrice,
          TaxPrice,
        }) => ({
          id_transaction: id,
          ...item,
          DateSell: new Date(DateSell),
          DateSend: DateSend,
          DeliveryPrice,
          Price: item.Price,
          Price_Fees: TaxPrice,
          review,
          buyerAccount: account,
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

      case FETCH_MYPROPOSITIONID:
        return {
          ...state,
          propositionId:{
            ...payload.item,
          pricepropose: payload.Price,
          dateApprove:payload.dateApprove,
          SendDate:payload.SendDate,
          id_Account:payload.id_Account,
          review:payload.review,
          Approve:payload.Approve,
          }
        }
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
      if (_.find(state[payload.obj], { id: payload.id })) {
        const removedItems = _.remove(state[payload.obj], (item) => {
          return item.id !== payload.id;
        });
        return {
          ...state,
          [payload.obj]: [...removedItems],
        };
      }
    // eslint-disable-next-line no-fallthrough
    case GET_NOTIFICATION:
      return {
        ...state,
        propositionNotification: [...payload?.resultsProposition],
        sellNotification: [...payload?.resultsSell],
        purchaseNotifcation: [...payload?.resultsPurchase],
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
      const sellNotif = state.sellNotification.filter(item =>{
        return item.id !== payload
      })
      return {
        ...state,
        sell: [...updatedData],
        sellNotification:[...sellNotif]
      };

    case RECEIVED:
      const updatedDataReceived = state.purchase.map((item) => {
        if (item.id === payload) {
          return { ...item, Status: "reçu" };
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
