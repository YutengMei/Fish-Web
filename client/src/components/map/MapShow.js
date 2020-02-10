import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow
} from "react-google-maps";
import { fetchSpots } from "../../actions";
import { addFishcatch } from "../../actions";

import mapStyle from "./mapStyle";

import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

import "./circle.css";
import { Link } from "react-router-dom";

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
    defaultOptions={{ styles: mapStyle }}
  >
    {props.spots.map(spot => (
      <MarkerWithLabel
        position={{ lat: spot.latitude, lng: spot.longtitude }}
        labelAnchor={new window.google.maps.Point(0, 0)}
        onClick={() => {
          props.onMarkerClick(spot);
        }}
        icon={{
          url: "/fishing.png",
          scaledSize: new window.google.maps.Size(35, 35)
        }}
      >
        <span className="like">{spot.fishCatched}</span>
      </MarkerWithLabel>
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
        <div className="ui buttons">
          <div
            className="ui red button"
            onClick={() => {
              props.increaseLike(props.selectedSpot._id);
            }}
          >
            <i className="heart icon"></i> Like
          </div>
          <div className="or"></div>
          <Link
            to={`/fishmap/forum/${props.selectedSpot._id}`}
            className="ui blue button"
          >
            <i className="comment icon"></i> Discuss
          </Link>
        </div>
      </InfoWindow>
    )}
  </GoogleMap>
));

class MapShow extends Component {
  state = { selectedSpot: null, lat: -34.397, lng: 150.644, alertOpen: false };

  componentDidMount() {
    this.props.fetchSpots();
    if (this.state.selectedSpot === null) {
      this.fetchGeolocation();
    }
  }
  alertOpen = () => {
    this.setState({ alertOpen: true });
  };
  alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ alertOpen: false });
  };

  fetchGeolocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
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

  handleLikeClick = id => {
    this.props.addFishcatch(id);
  };

  render() {
    return (
      <div style={{ width: "100vw", height: "91vh" }}>
        <MyMapComponent
          lat={this.state.lat}
          lng={this.state.lng}
          spots={this.props.spots}
          selectedSpot={this.state.selectedSpot}
          onMarkerClick={this.handleMarkerClick}
          increaseLike={this.handleLikeClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { spots: state.spots, errors: state.errors };
}

export default connect(
  mapStateToProps,
  { fetchSpots, addFishcatch }
)(MapShow);
