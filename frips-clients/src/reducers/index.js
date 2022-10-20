import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import itemReducer from "./itemReducer"
import auth from "./auth"
import messageReducer from "./messageReducer"
import favoriteReducers from "./favoriteReducers"
import myFrips from "./myFrips"
import filterCatalogue from "./filterCatalogue"
import notification from "./notification"
import itemForPropose from "./itemForPropose"
import creationItem from "./creationItem"
export default combineReducers({
    items:itemReducer,
    auth,
    messageReducer,
    favoriteReducers,
    myFrips
    ,filterCatalogue,
    itemForPropose,
    itemInfo:creationItem,
    notification,
    
    
    
})