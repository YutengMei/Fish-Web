import { FETCH_SPOTS, POST_SPOT, ADD_FISHCATCH } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SPOTS:
      return action.payload;
    case POST_SPOT:
      return [...state, action.payload];
    case ADD_FISHCATCH:
      return state.map(spot => {
        if (spot._id === action.payload._id) {
          return { ...spot, fishCatched: spot.fishCatched + 1 };
        }
        return spot;
      });
    default:
      return state;
  }
};
