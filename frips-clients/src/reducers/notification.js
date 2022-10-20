import {
    CLEAR_NOTIFICATION,
    NEW_NOTIFICATION,
    NOTIFICATION,
    UNREAD_NOTIFICATION
} from "../actions/type";

const initialState = {
  loading: true,
  notificationUser: [],
  unReadNotification: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NOTIFICATION:
      return {
        ...state,
        notificationUser: [...state.notificationUser, payload.id_Sender],
      };

    case UNREAD_NOTIFICATION:
      return {
        ...state,
        unReadNotification: payload,
      };
    case CLEAR_NOTIFICATION:{
        const removeArrayUser = state.notificationUser.filter((user,index)=>{
            return user.id !== payload.id
        })
        return {
            ...state,
            notificationUser:[...removeArrayUser]
        }
    }
    case NEW_NOTIFICATION:{
        return{
            ...state,
            unReadNotification:state.unReadNotification + payload < 0 ? 0 :state.unReadNotification + payload
        }
    }

    default:
      return state;
  }
};
