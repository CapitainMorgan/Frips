import _ from "lodash";
import { ADD_FILTER, ADD_FILTER_MYFRIPS, CHANGE_PAGINATION_MYFRIPS, FETCH_MYFRIPS, FETCH_MYSELL, FETCH_PROPOSITION, GET_NOTIFICATION, LOADING_MYFRIPS, REMOVE_NOTIFICATION_MYFRIPS, RESET_FILTER_MYFRIPS, SUCCESS_FETCH_MYFRIPS } from "../actions/type.js";


const initialValues = {
  loading: false,
  items: [],
  delivery: [],
  proposition: [],
  sell: [],
  purchase: [],
  filter:[],
  sellNotification:[],
  propositionNotification:[],
  pagination:1,
  count:0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_MYFRIPS:
      return {
        ...state,
        items: payload.items,
        count:payload.count
      };

      case FETCH_MYSELL:
        const sellArray = payload.items.map(({ item }) => item)
      return {
        ...state,
        sell:sellArray,
        count:payload.count
      };

      case FETCH_PROPOSITION:
      return {
        ...state,
        proposition: payload.items,
        count:payload.count
      };
      case CHANGE_PAGINATION_MYFRIPS:
        return {
          ...state,
          pagination:payload,
        }
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
          case REMOVE_NOTIFICATION_MYFRIPS:
            if(_.includes(state.propositionNotification,payload)){
           
              const removedItems = _.remove(state.propositionNotification, (id)=> {
                return id!== payload;
              });
              return {
                ...state,
                propositionNotification:[...removedItems]
              }
            }
            // eslint-disable-next-line no-fallthrough
            case GET_NOTIFICATION:
              return{
                ...state,
                propositionNotification:[...payload.resultsProposition],
                sellNotification:[...payload.resultsSell]
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
