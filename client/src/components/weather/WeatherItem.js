import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import * as weatherIcons from "./icons";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const DisplayForecast = (props) => {
  console.log("displayForecast", props);

  return (
    <List >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <span>
            <img
              className={` ${props.icon}`}
              style={{ fontSize: "24px" }}
              src={props.icon}
            ></img>
          </span>
        </ListItemAvatar>
        <ListItemText
          primary={`${props.forecast.startTime}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {Math.round(props.forecast.temperature)}&deg;F{"   "}
              </Typography>
              {props.forecast.windSpeed} km/h Winds{" "}
              {//props.forecast.main.humidity}% Humidity
              }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

const WeatherItem = (props) => {
  const classes = useStyles();

  console.log("weather item props", props);
  return (
    props.forecast.data.properties.periods.map((forecast, key) => {
      // const prefix = "wi wi-";
      // const icon =
      //     prefix + weatherIcons.default[forecast.weather[0].id].icon;
      return <div key={key}><DisplayForecast forecast={forecast} icon={forecast.icon} classes={classes} /></div>;
    })
  );
};

export default WeatherItem;
