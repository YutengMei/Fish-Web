import axios from "axios";
import weather from '../API/weather';
import solunar from '../API/solunar';
import {
  FETCH_USER,
  FETCH_SPOTS,
  POST_SPOT,
  FETCH_COMMENTS,
  POST_COMMENT,
  ADD_FISHCATCH,
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

export const fetchWeather = ( location ) => async dispatch => {
  console.log("fetchweather called");
  if (location.city) {
      const response = await weather.get(`/forecast?q=${location.city}&appid=af04de9346461375834dfa120b4ed29f`);
    // const { data } = response.data;
    // console.log("fetchweather", response);
    dispatch({type: FETCH_WEATHER, payload: response.data});
  } else {
    const response = await weather.get(`/forecast?lat=${location.lat}&lon=${location.lon}&appid=af04de9346461375834dfa120b4ed29f`);

    //const data = response.data;
    //console.log("fetchweather", data);
    dispatch({type: FETCH_WEATHER, payload: response.data});
  }
};

export const fetchSolunar = (lat, lon, date) => async dispatch => {
  const response = await solunar.get(`/${lat},${lon},${date},-4`);
  console.log(response);
  dispatch({type: FETCH_SOLUNAR, payload: response.data});
};
