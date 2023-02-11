import { AUTH_ERROR, REGISTER_FAILURE, REGISTER_SUCCESS, USER_LOADED ,LOGIN_FAIL,LOGIN_SUCCES, LOGOUT, SOCKET} from "../actions/type";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated:null,
    loading:true,
    user:null,
    error:null,
    socket:null
}


export default (state=initialState,action) =>{
    const {type,payload} = action;


    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                error:null,
                user:payload,
            }
        case MODERATOR_LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
              ...state,
              ...payload,
              error: null,
              isAuthenticated: true,
              isModerator: true,
              loading: false,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCES:
            localStorage.setItem("token",payload.token)
            return {
                ...state,
                ...payload,
                error:null,
                isAuthenticated:true,
                loading:false,
                
            }

        case REGISTER_FAILURE:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                error:payload,

                loading:false
            }
        case LOGOUT:

            localStorage.removeItem("token")
            return{
                ...state,
                token:null,
                isAuthenticated:false,

                loading:false
            }

            case SOCKET:
                return {
                    ...state,
                    socket:payload

                }


        default:
            return state
    }

}