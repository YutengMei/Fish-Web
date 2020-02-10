import { getDistance } from "geolib";
import moment from "moment-timezone";

export const validateLatitudeAndLongitude = (lat, lon) => {
  lat = parseFloat(lat);
  lon = parseFloat(lon);
  if (lat < -90 || lat > 90) {
    return false;
  }
  if (lon < -180 || lon > 180) {
    return false;
  }
  return true;
};

const getNearStation = (stationList, lat, lon) => {
  var closestStation = { stationId: null, distance: Number.MAX_VALUE };

  for (var i = 0; i < stationList.length; i++) {
    var station = stationList[i];
    var distance = getDistance(
      { latitude: lat, longitude: lon },
      { latitude: station.lat, longitude: station.lon }
    );
    if (distance < closestStation.distance) {
      closestStation.stationId = station.stationId;
      closestStation.distance = distance;
    }
  }

  return closestStation.stationId;
};
//simple url
//https://tidesandcurrents.noaa.gov/api/datagetter
//?begin_date=20130101 10:00&end_date=20130101 10:24&station=8454000
//&product=water_level&datum=mllw&units=metric&time_zone=gmt
//&application=web_services&format=xml
export const generateFetchEndpoint = (
  stationData,
  inputLat,
  inputLon,
  days = 2
) => {
  //extractStationId(statidonData);
  const closestStationId = getNearStation(
    stationData.stationList,
    inputLat,
    inputLon
  );

  const baseUrl = "https://tidesandcurrents.noaa.gov/api/datagetter";
  const station = "station=" + closestStationId;
  const futureDate = moment()
    .subtract(1, "day")
    .format("YYYYMMDD");

  const begin_date = "begin_date=" + futureDate;
  const range = "range=" + 24 * (days + 2);
  const product = "product=predictions";
  const application = "application=web_services";
  const datum = "datum=MLLW";
  const time_zone = "time_zone=lst_ldt";
  const units = "units=english";
  const interval = "interval=hilo";
  const format = "format=json";

  const endpoint =
    baseUrl +
    "?" +
    begin_date +
    "&" +
    range +
    "&" +
    station +
    "&" +
    product +
    "&" +
    application +
    "&" +
    datum +
    "&" +
    time_zone +
    "&" +
    units +
    "&" +
    interval +
    "&" +
    format;

  return endpoint;
};
