import {
  CREATE_ITEM,
  EDIT_ITEM,
  FETCH_ID_FAVORITE,
  FETCH_ITEM,
  FETCH_ITEMS,
  FETCH_NEW_ITEMS,
  GET_MORE_ITEMS,
  LOADING_FETCH_ITEM,
  LOADING_ITEM,
  RESET_ITEM,
  SUCCESS_CREATION_ITEM,
  SUCCESS_FETCH_ITEM,
} from "../actions/type.js";

const initialValues = {
  loading: true,
  items: [],
  UniqueItem: [],
  loaded: false,
  favorites: [],
  newItem: [],
  editItemPage: null,
  successCreationItem: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  switch (action.type) {
    case LOADING_ITEM:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case CREATE_ITEM:
      return {
        ...state,
        [action.payload.id]: [...state.items, action.payload],
      };

    case SUCCESS_CREATION_ITEM: {
      return {
        ...state,
        successCreationItem: action.payload,
      };
    }
    case EDIT_ITEM:
      action.payload.item_brand = action.payload.item_brand[0].brand.Name;
      action.payload.item_category =
        action.payload.item_category[0].id_Category;
      const newArray = [];
      action.payload.item_color.forEach((element) => {
        newArray.push(element.color);
      });
      action.payload.item_color = newArray;

      return {
        ...state,
        loaded: true,
        editItemPage: action.payload,
        loading: false,
      };
    case FETCH_ITEMS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload],

        loaded: true,
      };

    case GET_MORE_ITEMS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload],

        loaded: true,
      };

    case FETCH_ID_FAVORITE:
      return {
        ...state,
        loading: false,

        favorites: action.payload,
        loaded: true,
      };

    case FETCH_ITEM:
      return {
        ...state,

        UniqueItem: action.payload,
      };
      case LOADING_FETCH_ITEM:
        return{
          ...state,
          loading:true,
          loaded:false
        }
        case SUCCESS_FETCH_ITEM:
        return{
          ...state,
          loading:false,
          loaded:true
        }
      

    case FETCH_NEW_ITEMS:
      return {
        ...state,
        loading: false,

        newItem: [...action.payload],
        loaded: true,
      };

    case RESET_ITEM:
      return {
        ...state,
        UniqueItem:[]
      };

    default:
      return state;
  }
};
