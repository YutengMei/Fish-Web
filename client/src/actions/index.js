import axios from "axios";
import weather from "../API/weather";
import solunar from "../API/solunar";
import {
  FETCH_USER,
  FETCH_SPOTS,
  POST_SPOT,
  FETCH_COMMENTS,
  POST_COMMENT,
  ADD_FISHCATCH,
  ADD_FISHCATCH_FAIL,
  REMOVE_ERROR,
  FETCH_STATIONS,
  FETCH_WEATHER,
  FETCH_SOLUNAR
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
  const res = await axios.put(`/api/fishSpots/addFishCatch/${id}`);
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

export const fetchWeather = location => async dispatch => {
  console.log("fetchweather called");
  if (location.city) {
    const response = await weather.get(
      `/forecast?q=${location.city}&appid=${process.env.REACT_APP_OPENWEATHERMAP}`
    );
    // const { data } = response.data;
    // console.log("fetchweather", response);
    dispatch({ type: FETCH_WEATHER, payload: response.data });
  } else {
    const response = await weather.get(
      `/forecast?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP}`
    );

    //const data = response.data;
    //console.log("fetchweather", data);
    dispatch({ type: FETCH_WEATHER, payload: response.data });
  }
};

export const fetchSolunar = (lat, lon, date) => async dispatch => {
  const response = await solunar.get(`/${lat},${lon},${date},-4`);
  console.log(response);
  dispatch({ type: FETCH_SOLUNAR, payload: response.data });
};
