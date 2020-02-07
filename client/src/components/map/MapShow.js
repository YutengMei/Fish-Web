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
import { fetchSpots } from "../../actions";
import mapStyle from "./mapStyle";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
          <div className="ui red button">
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
    console.log(selectedSpot);
    if (selectedSpot !== null) {
      this.props.openForum(selectedSpot._id);
      this.setState({
        lat: selectedSpot.latitude,
        lng: selectedSpot.longtitude
      });
    }
  };

  render() {
    return (
      <div style={{ width: "98vw", height: "87vh" }}>
        <MyMapComponent
          lat={this.state.lat}
          lng={this.state.lng}
          spots={this.props.spots}
          selectedSpot={this.state.selectedSpot}
          onMarkerClick={this.handleMarkerClick}
          openForum={this.props.openForum}
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
