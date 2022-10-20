import { INFO_ITEM } from "../actions/type";


const initialState = {
    itemInfo:null,
    loading:true,
    loaded:false
}


export default (state=initialState,action) =>{
    const {type,payload} = action;


    switch(type){
        case INFO_ITEM:
            return{
                ...state,
                itemInfo:payload,
                loading:false,
                loaded:true,

            }
            default:
                return {
                    ...state
                }

        }
        
       

}