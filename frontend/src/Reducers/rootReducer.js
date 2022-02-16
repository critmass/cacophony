import user from "./userReducer";
import token from "./tokenReducer";
import servers from "./serverReducer"
import memberships from "./membershipReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({user, token, memberships, servers})

export default rootReducer