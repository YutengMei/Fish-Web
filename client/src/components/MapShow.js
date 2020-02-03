import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { fetchSpots } from "../actions";
const {
  MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLEMAP_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={12}
    center={{
      lat: props.lat,
      lng: props.lng
    }}
  >
    {props.spots.map(spot => (
      <Marker
        key={spot._id}
        position={{ lat: spot.latitude, lng: spot.longtitude }}
        onClick={() => {
          props.onMarkerClick(spot);
        }}
      />
    ))}
    {props.selectedSpot && (
      <InfoWindow
        position={{
          lat: props.selectedSpot.latitude,
          lng: props.selectedSpot.longtitude
        }}
        onCloseClick={() => {
          props.onMarkerClick(null);
        }}
      >
        <div>Spot details</div>
      </InfoWindow>
    )}
  </GoogleMap>
));

class MapShow extends Component {
  state = { selectedSpot: null, lat: -34.397, lng: 150.644 };

  componentDidMount() {
    this.props.fetchSpots();
    if (this.state.selectedSpot === null) {
      this.fetchGeolocation();
    }
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

  handleMarkerClick = selectedSpot => {
    this.setState({ selectedSpot: selectedSpot });
    if (selectedSpot !== null) {
      this.setState({
        lat: selectedSpot.latitude,
        lng: selectedSpot.longtitude
      });
    }
  };

  render() {
    console.log("re-render()", this.state.lat, this.state.lng);
    return (
      <div style={{ width: "98vw", height: "87vh" }}>
        <MyMapComponent
          lat={this.state.lat}
          lng={this.state.lng}
          spots={this.props.spots}
          selectedSpot={this.state.selectedSpot}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { spots: state.spots };
}

export default connect(
  mapStateToProps,
  { fetchSpots }
)(MapShow);
