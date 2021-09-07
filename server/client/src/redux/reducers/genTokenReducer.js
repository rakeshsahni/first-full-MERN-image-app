import {CHANGE_NAME, CHANGE_NAME_ERROR, ERROR_TOKEN, GEN_TOKEN, LOGOUT, LOGOUT_ERROR, SIGN_UP_SUCCESS,SIGN_UP_FAIL,LOGIN_SUCCESS,LOGIN_FAIL} from "./../types";
const initVal = {
    token : "",
    error : "",
    loger_id : "",
    loger_name : "xyz",
    errorlogout : "",
    logoutData : "",
    errorLoger : "",
    changeNameMessage : "loading...",
    authmsg : "loading...",
}

const genTokenReducer = (state=initVal,action) => {
    switch (action.type) {
        case GEN_TOKEN:
            return {
                ...state,
                errorlogout : "",
                token : action.payload.access_token,
                loger_id : action.payload.id,
                loger_name : action.payload.name,
            }
        case ERROR_TOKEN:
            return {
                ...state,
                loger_idid : "",
                token : "",
                loger_name : "xyz",
                error : action.payload,
            }
        case LOGOUT:
            localStorage.removeItem("isLogin");
            return {
                ...state,
                loger_id : "",
                token : "",
                loger_name : "xyz",
                errorlogout : "",
                logoutData : action.payload,
            }
        case LOGOUT_ERROR:
            return {
                ...state,
                errorlogout : action.payload,
            }
        case CHANGE_NAME : 
            return {
                ...state,
                loger_name : action.payload.name,
                changeNameMessage : action.payload.message,
            }
        case CHANGE_NAME_ERROR:
            return {
                ...state,
                loger_name : "xyz",
                errorLoger : action.payload,
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                token : "",
                authmsg : action.payload.message,
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                token : "",
                authmsg : action.payload.message,
            }
        case LOGIN_SUCCESS:
            // localStorage.setItem()
            if(action.payload.message === "login successfully..."){
                localStorage.setItem("isLogin",true);
            }
            return {
                ...state,
                // token : action.payload.token,
                authmsg : action.payload.message,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                token : "",
                authmsg : action.payload.message,
            }
        default:
            return state;
    }
}


export default genTokenReducer;