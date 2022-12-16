import {
    AUTH_ERROR, IMAGE_CHANGE, LOGIN_FAIL,
    LOGIN_SUCCES,
    LOGOUT, REGISTER_FAILURE,
    REGISTER_SUCCESS, SOCKET, USER_LOADED
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  socket: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCES:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        error: null,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAILURE:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: payload,

        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,

        loading: false,
      };
    case IMAGE_CHANGE:
      return {
        ...state,
        user:{
          ...state.user,
          image:{
            image:payload
          }
        }
      }  
    case SOCKET:
      return {
        ...state,
        socket: payload,
      };

    default:
      return state;
  }
};
