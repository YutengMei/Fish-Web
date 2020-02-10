import React, { useState } from "react";
import "./tideStyle.css";

const LocationInput = props => {
  const [location, setState] = useState({
    Latitude: null,
    Longitude: null
  });

  const handleChange = e => {
    const value = e.target.value;
    setState({
      ...location,
      [e.target.name]: value
    });
  };

  const handleSubmit = () => {
    props.generateChart(location);
  };

  return (
    <div className="locationInputField">
      <div className="locationButton">
        <div className="ui big icon input">
          <input
            type="number"
            name="Latitude"
            step="0.0000001"
            placeholder="Latitude"
            value={location.Latitude}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="ui big icon input">
          <input
            type="number"
            name="Longitude"
            step="0.0000001"
            placeholder="Longitude"
            value={location.Longitude}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="searchButton">
        <button class="big ui blue button" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default LocationInput;
