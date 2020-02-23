import React from "react";
import { connect } from "react-redux";
import SearchBar from './SearchBar';
import { fetchWeather } from '../../actions';
import { Container } from "@material-ui/core";
import WeatherList from './WeatherList';

class Weather extends React.Component {
  //state = {lat: null, lat: null};

  componentDidMount() {
    this.fetchGeolocation();
  }

  fetchWeather = location => {
    //this.props.fetchCurrentWeather(location);
    this.props.fetchWeather(location);
  };

  onLocationSubmit = (locate) => {
    const location = {};
    location.lat = locate.latitude;
    location.lon = locate.longtitude;
    this.fetchWeather(location);
    // this.props.fetchCurrentWeather(location);
    // this.props.fetchWeather(location);
    //console.log("props",this.props);
  }

  fetchGeolocation = () => {
    console.log("fetchGeolocation() called");
    window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log("GOT CURRENT LOCATION", position);
        const location = {};
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        this.fetchWeather(location);
        // this.props.fetchCurrentWeather(location);
        // this.props.fetchWeather(location);
        //console.log("props", this.props);
      },
      err => {}
    );
  };

  render() {
    console.log("props", this.props);
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onLocationSubmit}/>
        <Container>
          <WeatherList weather={this.props.weather} currentWeather={this.props.currentWeather}/>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather
  };
} ;

export default connect(mapStateToProps, { fetchWeather })(Weather);
