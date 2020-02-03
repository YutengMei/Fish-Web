import { combineReducers } from "redux";
import authReducer from "./authReducer";
import spotReducer from "./spotReducer";
import { reducer as reduxForm } from "redux-form";
import commentReducer from "./commentReducer";

export default combineReducers({
  auth: authReducer,
  spots: spotReducer,
  form: reduxForm,
  comments: commentReducer
});
