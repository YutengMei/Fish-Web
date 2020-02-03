import { FETCH_COMMENTS, POST_COMMENT } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    case POST_COMMENT:
      return [...state, action.payload];
    default:
      return state;
  }
};
