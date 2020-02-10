import axios from "axios";
import {
  FETCH_USER,
  FETCH_SPOTS,
  POST_SPOT,
  FETCH_COMMENTS,
  POST_COMMENT,
  ADD_FISHCATCH,
  ADD_FISHCATCH_FAIL,
  REMOVE_ERROR,
  FETCH_STATIONS
} from "./types";

export const fetchUser = () => {
  return async dispatch => {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const fetchSpots = () => async dispatch => {
  console.log("fetchSpot called");
  const res = await axios.get("/api/fishSpots");
  dispatch({ type: FETCH_SPOTS, payload: res.data });
};

export const postSpots = location => async dispatch => {
  const res = await axios.post("/api/fishSpots", location);
  if (res.data.error) {
    dispatch({ type: ADD_FISHCATCH_FAIL, payload: res.data.error });
  } else {
    dispatch({ type: POST_SPOT, payload: res.data });
  }
};

export const fetchComments = id => async dispatch => {
  const res = await axios.get(`/api/fishSpots/${id}`);
  dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const postComment = (comment, id) => async dispatch => {
  const res = await axios.post(`/api/fishSpots/${id}`, comment);
  if (res.data.error) {
    dispatch({ type: ADD_FISHCATCH_FAIL, payload: res.data.error });
  } else {
    dispatch({ type: POST_COMMENT, payload: res.data });
  }
};

export const addFishcatch = id => async dispatch => {
  const res = await axios.put(`/api/fishSpots/addFishCatch//${id}`);
  console.log(res);
  if (res.data.error) {
    dispatch({ type: ADD_FISHCATCH_FAIL, payload: res.data.error });
  } else {
    dispatch({ type: ADD_FISHCATCH, payload: res.data });
  }
};

export const removeError = () => dispatch => {
  dispatch({ type: REMOVE_ERROR });
};

export const fetchStation = () => async (dispatch, getState) => {
  const stations = getState().stations;

  if (!stations.stationList) {
    //fetch stations
    const res = await axios.get(
      "https://tidesandcurrents.noaa.gov/mdapi/v0.6/webapi/tidepredstations.json"
    );
    dispatch({ type: FETCH_STATIONS, payload: res.data });
  } else {
    return;
  }
};
