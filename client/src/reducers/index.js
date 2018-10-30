import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  movie: movieReducer,
  errors: errorReducer,
  auth: authReducer
});
