import { FETCH_SOLUNAR } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_SOLUNAR:
      return action.payload;
    default:
      return state;
  }
}
