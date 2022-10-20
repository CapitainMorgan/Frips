import {  ADD_FAVORITE,REMOVE_FAVORITE,FETCH_MYFAVORITE, FETCH_MYFAVORITEIDs} from "../actions/type.js"




const initialState = {
    favoritIds:[],
    favoritItem:[],
    loading:true,
    loaded:false
}


    

    // eslint-disable-next-line import/no-anonymous-default-export
    export default (state=initialState,action) =>{
        const {payload} = action

        switch(action.type){
            case ADD_FAVORITE:
                return {
                    ...state,
                    favoritIds:[...state.favoritIds, payload]
                }
            case REMOVE_FAVORITE:
                
                const newIds = state.favoritIds.filter(item =>{
                    return item.id_Item !== payload.id_Item
                })

                return {
                    ...state,
                    favoritIds:[...newIds]
                }

            case FETCH_MYFAVORITEIDs:
                return {
                    ...state,
                    favoritIds:[...payload]
                }


            case FETCH_MYFAVORITE:
                return {
                    ...state,
                    favoritItem:[...payload]
                }
            default:
                return state
        }
    }