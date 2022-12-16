import _ from "lodash";
import { ADD_FILTER, ADD_FILTER_MYFRIPS, FETCH_MYFRIPS, LOADING_MYFRIPS, RESET_FILTER_MYFRIPS, SUCCESS_FETCH_MYFRIPS } from "../actions/type.js";


const initialValues = {
  loading: false,
  items: [],
  delivery: [],
  proposition: [],
  sell: [],
  purchase: [],
  filter:[],
  pagination:1,
  count:0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;
  console.log(payload);
  switch (action.type) {
    case FETCH_MYFRIPS:
      return {
        ...state,
        items: [...payload],
      };
    case LOADING_MYFRIPS:
      return {
        ...state,
        loading: true,
      };
      case SUCCESS_FETCH_MYFRIPS:
        return {
          ...state,
          loading:false
        }
        case ADD_FILTER_MYFRIPS:
          if(_.includes(state.filter,payload)){
           
            const removedItems = _.remove(state.filter, (id)=> {
              return id!== payload;
            });
            return {
              ...state,
              filter:[...removedItems]
            }
          }
          else{
            return{
              ...state,
              filter:[...state.filter,payload]
            }
          }  
          case RESET_FILTER_MYFRIPS:
            return {
              ...state,
              filter:[]
            }
    default:
      return state;
  }
};
