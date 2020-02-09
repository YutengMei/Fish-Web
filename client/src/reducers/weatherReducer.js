import { FETCH_WEATHER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return action.payload;
    default:
      return state;
  }
}
