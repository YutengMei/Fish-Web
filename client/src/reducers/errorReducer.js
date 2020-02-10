import { ADD_FISHCATCH_FAIL, REMOVE_ERROR } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_FISHCATCH_FAIL:
      return [action.payload];
    case REMOVE_ERROR:
      return [];
    default:
      return state;
  }
}
