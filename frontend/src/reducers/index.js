import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import league from "./league";

export default combineReducers({
  auth,
  message,
  league,
});
