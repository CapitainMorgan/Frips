import { GENERATE_CONV, GET_ALL_CONV, GET_CONV, MSG_ERROR, NEW_CONVERSATION, NEW_MESSAGE,GET_LASTMESSAGE, GET_MORE_MESSAGE, LOADING_MESSAGE, HAS_MORE, NO_MORE, MESSAGE_LOADING, GET_MORE_MESSAGE_LOADING, ADD_MORE_MESSAGE, Page_NUMBER, GET_ITEM_PROPOSE, ADD_MESSAGE_IMAGE } from "../actions/type";




const initialState = {
    loading:true,
    conversations:[],
    openConversation:null,
    lastMessage:[],
    moreMessageLoading:false,
    pageNumber:1,
    id_Chat:null,
    sendPropose:false,
    ProfileNumber:{},
    numberLoadingMessage:null,
    itemForPropose:[],
    item:null,
    loaded:false,
    newMessage:false,
    hasmore:null,
}

export default (state=initialState,action) =>{

    
    const {type,payload} = action;



    switch(type){
        
            case NEW_MESSAGE:
            return {
                ...state,
                conversations:payload,
            }

        case GET_ALL_CONV:
                return {
                    ...state,
                    loading:false,
                    conversations:payload,
                    loaded:true,
                    newMessage:true,
                    hasmore:true,


            }

        case GENERATE_CONV:
        case GET_CONV:
            return {
                ...state,
                loading:false,
                openConversation:payload,
                conversations:[],

            


                Profile:{
                    Profile2:{
                        ProfileName:payload.Profile1.Pseudo,
                        ProfileNumber:payload.Profile1.id,
                        imageProfile:payload.Profile1?.image
                },
                Profile1:{
                    ProfileName:payload.Profile.Pseudo,
                    ProfileNumber:payload.Profile.id,
                    imageProfile:payload.Profile?.image
            }
            
            },
                message:[...payload.message],
                newMessage:true,
                loaded:true,
                hasmore:payload.messageNumber,


                
            }
        

            case GET_MORE_MESSAGE_LOADING:
            return {
            ...state,
            moreMessageLoading:true,

        }

        case Page_NUMBER:
            return {
            ...state,
            moreMessageLoading:true,
            pageNumber: state.pageNumber

        }

        case GET_MORE_MESSAGE:
            return {
                ...state,
                 loading:false,
                 message: [...state.message,...payload ],
                lastMessage:[...payload],

                 moreMessageLoading:false,


            loaded:true,
             newMessage:false


            }

            case NO_MORE:
                return {
                    ...state,
                     loading:false,
                     hasmore:false,
                    loaded:true,
                 newMessage:false
    
    
                }


               
                case MESSAGE_LOADING:
                return {
                    ...state,
                    loading:true,
                    loaded:false,
                    sendPropose:false,
                    
    
    
                }

                

    
                    case ADD_MORE_MESSAGE:
                        return {
                            ...state,
                            message:[payload,...state.message],
                         newMessage:true,
                         sendPropose:false,
            
            
                        }

                        case ADD_MESSAGE_IMAGE:
                            return{
                                ...state,
                                item:payload,
                                sendPropose:true,
                            }

                        
            

        
            


        default:
            return state
    }

}