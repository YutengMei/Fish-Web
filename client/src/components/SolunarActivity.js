import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSolunar } from '../actions';

class SolunarActivity extends React.Component {
  componentDidMount(){
//     const geocoder = new google.maps.Geocoder();
//     const address = "new york";
//     geocoder.geocode( { 'address': address}, function(results, status) {
//
//       if (status == google.maps.GeocoderStatus.OK) {
//         const latitude = results[0].geometry.location.lat();
//         const longitude = results[0].geometry.location.lng();
//         alert(latitude);
//     }
// });
    console.log(this.props);
    this.props.fetchSolunar(40.59880769999999,-73.9447994,20200209,20200209);
  }

  render(){
    return <div>Solunary</div>;
  }
}

export default connect(null, { fetchSolunar })(SolunarActivity);
