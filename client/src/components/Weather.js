import React from "react";
import { connect } from "react-redux";

class Weather extends React.Component {
  state = {lat: null, lat: null};

 componentDidMount() {
   this.fetchGeolocation();
   console.log(this.state.lat);
 }

  fetchGeolocation = () => {
    console.log("fetchGeolocation() called");
    window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log("GOT CURRENT LOCATION", position);
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      err => {}
    );
  };

  render() {
    return <div>weather</div>;
  }
}

export default Weather;
