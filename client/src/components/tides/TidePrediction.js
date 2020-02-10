/**
If you want to graph the results,
then you need to get the heights. Heights for 7 days every 1/2 hour
**/
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStation } from "../../actions";
import {
  generateFetchEndpoint,
  validateLatitudeAndLongitude
} from "./tideApiHelper";
import axios from "axios";
import LocationInput from "./LocationInput";
import TideChart from "./TideChart";
import { Alert } from "@material-ui/lab";

class TidePrediction extends Component {
  state = {
    tideData: { tideLevel: [], time: [] },
    error: false
  };

  componentDidMount() {
    this.props.fetchStation();
  }

  fetchingTideData = async location => {
    if (this.props.stations.stationList && location.Latitude) {
      const lat = parseFloat(location.Latitude);
      const lon = parseFloat(location.Longitude);
      const tideEndpoint = generateFetchEndpoint(
        this.props.stations,
        lat,
        lon,
        7
      );
      const tideData = await axios.get(tideEndpoint);
      const tideLevel = tideData.data.predictions.map(data => {
        return parseFloat(data.v);
      });

      const time = tideData.data.predictions.map(data => {
        return data.t;
      });
      const data = { tideLevel: tideLevel, time: time };
      this.setState({ tideData: data });
    } else {
      //loading spinner
    }
  };

  generateChart = location => {
    const lat = parseFloat(location.Latitude);
    const lon = parseFloat(location.Longitude);
    if (!validateLatitudeAndLongitude(lat, lon)) {
      this.setState({ error: true });
      return;
    } else {
      this.setState({ error: false });
      this.fetchingTideData(location);
    }
  };

  render() {
    return (
      <div className="ui segment">
        <h1 id="tidechar_id">
          Enter the Geographic Coordinate to generate the Tide Times
        </h1>
        <LocationInput generateChart={this.generateChart} />
        {this.state.error && (
          <Alert severity="error" style={{ width: "50%", marginLeft: "18%" }}>
            Please enter the valid coordinates
          </Alert>
        )}
        <TideChart
          tideLevel={this.state.tideData.tideLevel}
          time={this.state.tideData.time}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { stations: state.stations };
}

export default connect(
  mapStateToProps,
  { fetchStation }
)(TidePrediction);
