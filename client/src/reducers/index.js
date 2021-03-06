import { combineReducers } from "redux";
import authReducer from "./authReducer";
import spotReducer from "./spotReducer";
import errorReducer from "./errorReducer";
import { reducer as reduxForm } from "redux-form";
import commentReducer from "./commentReducer";

import tideReducer from "./tideReducer";

import weatherReducer from "./weatherReducer";
import solunarReducer from "./solunarReducer";

export default combineReducers({
  auth: authReducer,
  spots: spotReducer,
  form: reduxForm,
  comments: commentReducer,
  errors: errorReducer,
  stations: tideReducer,
  weather: weatherReducer,
  solunar: solunarReducer
});
