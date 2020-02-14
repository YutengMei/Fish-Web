import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
  Grid
} from "@material-ui/core";
import LoadingSpinner from "./LoadingSpinner";
import * as weatherIcons from "./icons";
import WeatherItem from "./WeatherItem";

const useStyles = makeStyles(theme => ({
  atmospheric: {
    fontSize: "28px",
    padding: "5px"
  },
  card: {
    minWidth: 600,
    minHeight: 600
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  wi: {
    color: "#673ab7"
  }
}));

const WeatherList = ({weather}) => {

  const classes = useStyles();
  if (!weather) {
    return (
      <LoadingSpinner />
    );
  };
  console.log("weatherbody",weather,weather.currentWeather.data.weather[0].id);
  const prefix = "wi wi-";
  const icon =
      prefix + weatherIcons.default[weather.currentWeather.data.weather[0].id].icon;
  console.log("icon111",icon);
  return (
   <div className={classes.layout}>
     <Grid container spacing={3}>
       <Grid item xs={12}>
         <WeatherCard
            currentWeather={weather.currentWeather}
            forecast={weather.forecast}
            icon={icon}
          />
       </Grid>
     </Grid>
   </div>
  );
 };

 const WeatherCard = props => {
   const classes = useStyles();
   const humidity = "wi wi-humidity";
   const strongWind = "wi wi-strong-wind";

   return (
     <Card className={classes.card}>
       <CardHeader
         title={props.currentWeather.data.name + ", " + props.currentWeather.data.sys.country}

       />
       <CardContent>
         <CardMedia
           className={`${props.icon} ${classes.wi}`}
           src={props.icon}
           style={{ fontSize: "128px", float: "right" }}
         />
         <Typography
           variant="h2"
           className="big-temp"
           color="textPrimary"
           component="h2"
           style={{ fontFamily: "Montserrat", paddingTop: "30px" }}
         >
           {Math.round(props.currentWeather.data.main.temp)}&deg;C
         </Typography>
         <Typography
           variant="subtitle2"
           className="atmospheric-conditions"
           color="textSecondary"
           gutterBottom
           style={{ paddingTop: "40px" }}
         >
           <span
             className={`${strongWind} ${classes.wi} ${classes.atmospheric}`}
           ></span>
           {props.currentWeather.data.wind.speed} km/h Winds{" "}
           <span
             className={`${humidity} ${classes.wi} ${classes.atmospheric}`}
           ></span>
           {props.currentWeather.data.main.humidity}% Humidity
         </Typography>
         <Divider variant="middle" />
         <WeatherItem forecast={props.forecast} />
       </CardContent>
     </Card>
   );
 };

export default WeatherList;
