import {
  FETCH_MYFRIPS
} from "../actions/type.js";

import _ from "lodash";

const initialValues = {
  loading: true,
  items: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  switch (action.type) {
    case FETCH_MYFRIPS:
      return {
        ...state,
        items: _.mapKeys(action.payload, "id"),
        loading: false,
      };
    default:
      return state;
  }
};
