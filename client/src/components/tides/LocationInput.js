import React, { useState } from "react";
import "./tideStyle.css";

const LocationInput = props => {
  const [location, setLState] = useState({
    Latitude: null,
    Longitude: null,
  });

  let initDate = (props.button) ? props.fetchDate():null;
  const [date, setValue] = useState(initDate);

  const handleAddValue = (day) => {
    if (day === 1) {
      const newValue = parseInt(date)+1;
      setValue(newValue);
      console.log(date);
      handlePreNextSubmit(date);
    } else {
      const newValue = parseInt(date)-1;
      setValue(newValue);
      console.log(date);
      handlePreNextSubmit(date);
    }
  };

  const handleChange = e => {
    const value = e.target.value;
    setLState({
      ...location,
      [e.target.name]: value
    });
  };

  const handleSubmit = () => {
    props.generateChart(location);

  };

  const handlePreNextSubmit = (date) => {
    props.generateChart(location, date);
  };

  let buttonPre = (props.button) ? props.pre:null;
  let buttonNext = (props.button) ? props.next:null;

  const buttonDisplay = () => {
    if (props.button && buttonPre){
      buttonPre = false;
      return (
        <div className="searchButton">
          <button class="big ui blue button" onClick={()=>handleAddValue(-1)}>
            Previous Day
          </button>
        </div>
      );
    } else if (props.button && buttonNext){
      buttonNext = false;
      return (
        <div className="searchButton">
          <button class="big ui blue button" onClick={()=>handleAddValue(1)}>
            Next Day
          </button>
        </div>
      );
    }
  };

  return (
    <div className="locationInputField">
      {buttonDisplay()}
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
      {buttonDisplay()}
    </div>
  );
};

export default LocationInput;
