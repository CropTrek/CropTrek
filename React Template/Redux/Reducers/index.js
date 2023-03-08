import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ErrorsReducer from "./ErrorsReducer";

export default combineReducers({
    auth : AuthReducer,
    errors : ErrorsReducer
})