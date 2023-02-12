import {
  LOADING_PAYMENT,
  PAYMENT_FAILED,
  PAYMENT_INFO,
  PAYMENT_INFO_SUCCESS_FETCH,
  PAYMENT_INTENT,
  PAYMENT_SUCCESS,
} from "../actions/type.js";

const initialValues = {
  loading: false,
  item: null,
  clientSecret: "",
  successed: null,
  failed: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOADING_PAYMENT:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_FAILED:
      return {
        ...state,
        failed: true,
        successed: false,
        loading: false,
      };
    case PAYMENT_SUCCESS:
      return {
        ...state,
        successed: true,
        failed: false,
        loading: false,
      };
    case PAYMENT_INFO:
      return {
        ...state,
        item: payload.item,
      };
    case PAYMENT_INFO_SUCCESS_FETCH:
      return {
        ...state,
        loading: false,
      };

    case PAYMENT_INTENT:
      return {
        ...state,
        clientSecret: payload.client_secret,
      }

    default:
      return state;
  }
};
