import { FETCH_SPOTS, POST_SPOT, ADD_FISHCATCH } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SPOTS:
      return action.payload;
    case POST_SPOT:
      return [...state, action.payload];
    case ADD_FISHCATCH:
      return state.map(spot =>
        spot._id === action.payload._id ? action.payload : spot
      );
    default:
      return state;
  }
};
