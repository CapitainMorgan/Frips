import _ from "lodash"
import { fetchMoreItems } from "../actions/index.js"
import { ADD_FILTER, ADD_FILTER_PRICE, ERROR, FETCH_ITEM_TYPE, FILTER, REMOVE_FILTER_TYPE } from "../actions/type.js"


const initialValues= {
    loading:true,
    typeOfError:{},
    loaded:false,  

}
    // eslint-disable-next-line import/no-anonymous-default-export
    export default (state=initialValues,action) =>{
        const {payload} = action



        switch(action.type){
          
                            
                    
            default:
                return state
        }
    }