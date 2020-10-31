import { combineReducers } from "redux";
import app from "./app.reducer";
import alert from "./alert.reducer";

export default combineReducers({
  app,
  alert,
});
