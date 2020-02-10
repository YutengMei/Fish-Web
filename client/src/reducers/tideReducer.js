import { FETCH_STATIONS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_STATIONS:
      return action.payload || false;
    default:
      return state;
  }
}
