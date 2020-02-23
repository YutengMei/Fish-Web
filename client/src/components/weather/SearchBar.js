import React from 'react';
import axios from "axios";

class SearchBar extends React.Component{
  state = {term: ''}; //term=input

  onInputChange = (event) => {
    this.setState({term: event.target.value});
  };

  checkValidAdress = async formValues => {
    const coordinate = { latitude: null, longtitude: null };


    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: formValues,
          key: process.env.REACT_APP_GOOGLEMAP_KEY
        }
      }
    );

    if (res.data.results.length === 0) {
      console.log("havent got address");
      return coordinate; //no results
    }

    coordinate.latitude = res.data.results[0].geometry.location.lat;
    coordinate.longtitude = res.data.results[0].geometry.location.lng;
    this.props.onFormSubmit(coordinate);
  };

  onFormSbumit = (event) => {
    event.preventDefault();
    this.checkValidAdress(this.state.term);
    //this.props.onFormSubmit(this.state.term);
  };

  render(){
    return (
      <div className="ui segment">
        <div className="locationInputField">
          <div className="ui huge action input">
            <input type="text" placeholder="Enter a City to Search..." value={this.state.term} onChange={this.onInputChange} onSubmit={this.onFormSbumit}/>
            <button className="ui blue icon button" onClick={this.onFormSbumit}><i aria-hidden="true" class="search icon"></i></button>
              &nbsp;
            <button className="big ui blue button" onClick={this.onFormSbumit}>&deg;C/&deg;F</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
