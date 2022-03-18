import user from "./userReducer";
import token from "./tokenReducer";
import server from "./serverReducer"
import memberships from "./membershipReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({user, token, memberships, server})

export default rootReducer