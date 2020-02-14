import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSolunar } from '../../actions';
import LocationInput from '../tides/LocationInput';
import { Alert } from "@material-ui/lab";
import {
  validateLatitudeAndLongitude
} from "../tides/tideApiHelper";
import TideChart from "../tides/TideChart";

class SolunarActivity extends React.Component {
  state = {
    solunarData: { solunarRating: [], time: [] },
    error: false
  };

  componentDidMount(){
    this.fetchGeolocation();
  }

  fetchDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + mm + dd;
    return today;
  };

  fetchGeolocation = () => {
    console.log("fetchGeolocation() called");
    window.navigator.geolocation.getCurrentPosition(
      async position => {
        console.log("GOT CURRENT LOCATION", position);
        const location = {};
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        const today = this.fetchDate();
        await this.props.fetchSolunar(location.lat, location.lon, today);
        //console.log("props", this.props);
        //console.log("hrlyrating",this.props);
        this.updateChartState();
      },
      err => {}
    );
  };

  generateChartHelper = (lat, lon, today) => {
    if (!validateLatitudeAndLongitude(lat, lon)) {
      this.setState({ error: true });
      return;
    } else {
      this.setState({ error: false });
      console.log("solunar",this.props);
      this.props.fetchSolunar(lat, lon, today);
      this.updateChartState();
    }
  };

  noLocationSubmitHandler = (date) => {
    window.navigator.geolocation.getCurrentPosition(
      async position => {
        console.log("GOT CURRENT LOCATION", date);
        const location = {};
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        await this.props.fetchSolunar(location.lat, location.lon, date);
        //console.log("props", this.props);
        //console.log("hrlyrating",this.props);
        this.updateChartState();
      },
      err => {}
    );
  }

  generateChart = (location, date) => {
    console.log("genearte cahrt", location)
    const lat = parseFloat(location.Latitude);
    const lon = parseFloat(location.Longitude);
    if (!date) {
      if (!location.Latitude) {
        this.fetchGeolocation();
      } else {
        const today = this.fetchDate();
        this.generateChartHelper(lat, lon, today);
      }
    } else {
      if (!location.Latitude) {
        this.noLocationSubmitHandler(date)
      }
      else{
        const today = date;
        this.generateChartHelper(lat, lon, today);
      }
    }
  };

  updateChartState = () => {
    const hourlyRating = this.props.solunar.hourlyRating;
    console.log("hrlyrating",hourlyRating);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const solunarRating = Object.keys(hourlyRating).map(function(key, index) {
      return hourlyRating[key];
    });
    const time = Object.keys(hourlyRating).map(function(key, index) {
      if (key < 10) {
        return yyyy + '-' + mm + '-' + dd + ' 0' + key + ':00';
      } else {
        return yyyy + '-' + mm + '-' + dd + ' ' + key + ':00';
      };
    });
    const data = { solunarRating: solunarRating, time: time };
    this.setState({ solunarData: data });
    console.log("solunarRating",solunarRating, time, this.state);
  }

  render(){
    const button = true;
    return (
      <div className="ui segment">
        <h1 id="tidechar_id">
          Enter the Geographic Coordinate to generate the Solunar Times
        </h1>
        <LocationInput button={true} pre={true} next={true} generateChart={this.generateChart} fetchDate={this.fetchDate}/>
        {this.state.error && (
          <Alert severity="error" style={{ width: "50%", marginLeft: "18%" }}>
            Please enter the valid coordinates
          </Alert>
        )}
        <TideChart
          tideLevel={this.state.solunarData.solunarRating}
          time={this.state.solunarData.time}
          name="Solunar Hourly Rating"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { solunar: state.solunar };
}

export default connect(mapStateToProps, { fetchSolunar })(SolunarActivity);
