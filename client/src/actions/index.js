import axios from "axios";
import {
  FETCH_USER,
  FETCH_SPOTS,
  POST_SPOT,
  FETCH_COMMENTS,
  POST_COMMENT,
  ADD_FISHCATCH
} from "./types";

export const fetchUser = () => {
  return async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const fetchSpots = () => async dispatch => {
  const res = await axios.get("/api/fishSpots");
  dispatch({ type: FETCH_SPOTS, payload: res.data });
};

export const postSpots = location => async dispatch => {
  const res = await axios.post("/api/fishSpots", location);

  dispatch({ type: POST_SPOT, payload: res.data });
};

export const fetchComments = id => async dispatch => {
  const res = await axios.get(`/api/fishSpots/${id}`);
  dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const postComment = (comment, id) => async dispatch => {
  console.log("postComment inside action called", comment);
  const res = await axios.post(`/api/fishSpots/${id}`, comment);
  console.log(res.data);
  dispatch({ type: POST_COMMENT, payload: res.data });
};

export const addFishcatch = id => async dispatch => {
  const res = await axios.put(`/api/fishSpots/addFishCatch//${id}`);
  dispatch({ type: ADD_FISHCATCH, payload: res.data });
};
