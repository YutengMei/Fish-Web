
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
