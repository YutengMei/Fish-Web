import React from "react";
import { connect } from "react-redux";
import SearchBar from './SearchBar';
import { fetchWeather } from '../../actions';
import WeatherList from './WeatherList';

class Weather extends React.Component {
  //state = {lat: null, lat: null};

  componentDidMount() {
    this.fetchGeolocation();
  }

  onLocationSubmit = (city) => {
    const location = {};
    location.city = city;
    console.log(location);
    this.props.fetchWeather(location);
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
        this.props.fetchWeather(location);
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
        <WeatherList weather={this.props.weather} />
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
