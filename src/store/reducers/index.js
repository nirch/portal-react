import activeUserReducer from "./ActiveUser/reducer";
import { combineReducers } from "redux";

export default combineReducers({
    activeUser: activeUserReducer,
});