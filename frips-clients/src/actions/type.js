//auth system

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const RESET_ERROR = "RESET_ERROR";

export const USER_LOADED = "USER_LOADED";
export const IMAGE_CHANGE = "IMAGE_CHANGE";

export const AUTH_ERROR = "AUTH_ERROR";
export const CHANGE_ADDRESS ="CHANGE_ADDRESS" 
export const CHANGE_IBAN = "CHANGE_IBAN"
export const CHANGE_PROFILE_IMAGE = "CHANGE_PROFILE_IMAGE";
export const SOCKET = "SOCKET";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT = "LOGOUT";

//Items

export const CREATE_ITEM = "CREATE_ITEM";
export const FETCH_ITEM = "FETCH_ITEM";
export const FETCH_ITEMS = "FETCH_ITEMS";
export const EDIT_ITEM = "EDIT_ITEM";
export const ERROR_ITEM = "ERROR_ITEM"
export const SUCCESS_FETCH_ITEM = "SUCCESS_FETCH_ITEM";
export const LOADING_FETCH_ITEM = "LOADING_FETCH_ITEM";

export const RESET_ITEM = "RESET_ITEM";
export const SUCCESS_CREATION_ITEM = "SUCCESS_CREATION_ITEM";
export const LOADING_ITEM = "LOADING_ITEM";
export const FETCH_NEW_ITEMS = "FETCH_NEW_ITEMS";
export const GET_MORE_ITEMS = "GET_MORE_ITEMS";

export const FETCH_ID_FAVORITE = "FETCH_ID_FAVORITE";

///MYFRIPS///
export const LOADING_MYFRIPS = "LOADING_MYFRIPS";
export const FETCH_MYFRIPS = "FETCH_MYFRIPS";
export const FETCH_MYDELIVERY = "FETCH_MYDELIVERY";
export const FETCH_MYSELL = "FETCH_MYSELL";
export const FETCH_MYPURCHASE = "FETCH_MYPURCHASE";
export const FETCH_PROPOSITION = "FETCH_PROPOSITION";
export const SUCCESS_FETCH_MYFRIPS = "SUCCESS_FETCH_MYFRIPS";
export const ADD_FILTER_MYFRIPS = "ADD_FILTER_MYFRIPS";
export const RESET_FILTER_MYFRIPS = "RESET_FILTER_MYFRIPS";
export const CHANGE_PAGINATION_MYFRIPS = "CHANGE_PAGINATION_MYFRIPS";
export const DELIVERY = "DELIVERY";
export const REVIEW = "REVIEW";
export const RECEIVED = "RECEIVED"
export const REMOVE_ITEM = "REMOVE_ITEM"
export const STATUS_PROPOSITION = "STATUS_PROPOSITION"
export const FETCH_MYSELLBYID = "FETCH_MYSELLBYID"
export const FETCH_MYPROPOSITIONID = "FETCH_MYPROPOSITIONID"
export const FETCH_MYPROPOSITION_RECEIVED_ID = "FETCH_MYPROPOSITION_RECEIVED_ID"
export const MYFRIPS_ERROR = "MYFRIPS_ERROR" 
export const MYFRIPS_ERROR_FETCH = "MYFRIPS_ERROR_FETCH" 
export const STATUS_PROPOSITION_ID = "STATUS_PROPOSITION_ID"
export const FETCH_MYPURCHASEID = "FETCH_MYPURCHASEID"


///MESSAGES///

export const NEW_MESSAGE = "NEW_MESSAGE";
export const GENERATE_CONV = "GENERATE_CONV";
export const GET_ALL_CONV = "GET_ALL_CONV";
export const GET_CONV = "GET_CONV";
export const GET_LASTMESSAGE = "GET_LASTMESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";

export const ADD_MORE_MESSAGE = "ADD_MORE_MESSAGE";
export const ADD_MESSAGE_IMAGE = "ADD_MESSAGE_IMAGE";

export const GET_MORE_MESSAGE = "GET_MORE_MESSAGE";
export const HAS_MORE = "HAS_MORE";
export const NO_MORE = "NO_MORE";

export const MESSAGE_ERROR = "MESSAGE_ERROR";
export const MESSAGE_LOADING = "MESSAGE_LOADING";
export const MESSAGE_FETCH_SUCCESS = "MESSAGE_FETCH_SUCCESS";

export const GET_MORE_MESSAGE_LOADING = "GET_MORE_MESSAGE_LOADING";
export const GET_MORE_MESSAGE_ERROR = "GET_MORE_MESSAGE_ERROR";
export const Page_NUMBER = "Page_NUMBER";
export const ERROR_MESSAGE = "ERROR_MESSAGE";


export const GET_CONV_ERROR = "GET_CONV_ERROR ";
export const GET_CONV_LOADING = "GET_CONV_LOADING";

export const MSG_ERROR = "MSG_ERROR";

//Favorite
export const FETCH_FAVORITE = "FETCH_FAVORITE";
export const FETCH_FAVORITE_SUCCESS = "FETCH_FAVORITE_SUCCESS";
export const NUMBER_COUNT = "NUMBER_COUNT";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const FETCH_MYFAVORITEIDs = "FETCH_MYFAVORITEIDs";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const FETCH_MYFAVORITE = "FETCH_MYFAVORITE";

//Filter

export const FILTER = "FILTER";
export const FETCH_ITEM_TYPE = "FETCH_ITEM_TYPE";
export const FETCH_NEW_ITEM_TYPE = "FETCH_NEW_ITEM_TYPE";
export const FETCH_TOP_BUSINESS = "FETCH_TOP_BUSINESS";
export const FETCH_ITEM_FILTER_SUCCESS = "FETCH_ITEM_FILTER_SUCCESS";
export const CHANGE_PAGINATION = "CHANGE_PAGINATION";
export const GET_SEARCH = "GET_SEARCH";
export const FILTER_SEARCH = "FILTER_SEARCH";

export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const CREATE_CHIPS = "CREATE_CHIPS";

export const FETCH_FILTER = "FETCH_FILTER";

/// ITEMFORPROPOSE ///¨
export const GET_ITEM_PROPOSE = "GET_ITEM_PROPOSE";
export const SEND_DATE = "SEND_DATE";
export const REMOVE_NOTIFICATION_MYFRIPS = "REMOVE_NOTIFICATION_MYFRIPS";
export const GET_NOTIFICATION ="GET_NOTIFICATION"


export const GET_ITEM_PROPOSE_LOADING = "GET_ITEM_PROPOSE_LOADING";

export const GET_ITEM_PROPOSE_FROMID = "GET_ITEM_PROPOSE_FROMID";
export const GET_ITEM_PROPOSE_LOADING_FROMID =
  "GET_ITEM_PROPOSE_LOADING-_FROMID";

export const GET_ITEM_ID_PROPOSE = "GET_ITEM_ID_PROPOSE";

export const HANDLE_SECOND_PAGE = "HANDLE_SECOND_PAGE";
export const HANDLE_AWAYSECOND_PAGE = "HANDLE_AWAYSECOND_PAGE";

export const HANDLE_CLICK_FORPROPOSE = "HANDLE_CLICK_FORPROPOSE";
export const HANDLEAWAY_CLICK_FORPROPOSE = "HANDLEAWAY_CLICK_FORPROPOSE";

export const DISPATCH_HANDLECLICK = "DISPATCH_HANDLECLICK";

/// PATHNAME ///

export const SET_PATH = "SET_PATH";

/// GETINFOITEM ///
export const INFO_ITEM = "INFO_ITEM";
export const FETCH_INFO_ITEM = "FETCH_INFO_ITEM";
export const FETCH_INFO_ITEM_SUCCESS = "FETCH_INFO_ITEM_SUCCESS";

export const SEARCH = "SEARCH";

/// ERROR ///
export const ERROR = "ERROR";

/// NOTIFICATION ///
export const NOTIFICATION = "NOTIFICATION";
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
export const UNREAD_NOTIFICATION = "UNREAD_NOTIFICATION";
export const NEW_NOTIFICATION = "NEW_NOTIFICATION";
export const READ_CONVERSATION = "READ_CONVERSATION";
export const READ_MESSAGE = "READ_MESSAGE";

/// PAYMENT ///

export const PAYMENT_SUCCESS = "PAYMENT_SUCCESS";
export const PAYMENT_FAILED = "PAYMENT_FAILED";
export const LOADING_PAYMENT = "LOADING_PAYMENT";
export const PAYMENT_INFO_SUCCESS_FETCH = "PAYMENT_INFO_SUCCESS_FETCH";
export const PAYMENT_INFO = "PAYMENT_INFO";
export const PAYMENT_INTENT = "PAYMENT_INTENT";
export const ISRESERVED = "ISRESERVED";
export const ERROR_PAYMENT_PAGE = "ERROR_PAYMENT_PAGE"
export const RESET_PAYMENT = "RESET_PAYMENT"

/// MEMBERS ///
export const MEMBERS_LOADING = "MEMBERS_LOADING"
export const MEMBERS_FETCH_SUCCESS = "MEMBERS_FETCH_SUCCESS" 
export const MEMBERS_ITEMS = "MEMBERS_ITEMS"


/// LOCATION ///
export const SET_PREVIOUS_LOCATION = "SET_PREVIOUS_LOCATION"