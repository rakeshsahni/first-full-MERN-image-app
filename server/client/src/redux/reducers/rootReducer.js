import {combineReducers} from "redux";
import getReducer from "./getReducer";
import genTokenReducer from "./genTokenReducer";
// import snackbarReducer from "./snackbarReducer";
// import authReducer from "./authReducer";
const rootReducer = combineReducers({
    getReducer,
    genTokenReducer,
})

export default rootReducer;