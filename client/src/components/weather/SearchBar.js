import React from 'react';

class SearchBar extends React.Component{
  state = {term: ''}; //term=input

  onInputChange = (event) => {
    this.setState({term: event.target.value});
  };

  onFormSbumit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.term);
  };

  render(){
    return (
      <div className="ui segment">
        <div className="locationInputField">
          <div className="ui huge action input">
            <input type="text" placeholder="Enter a City to Search..." value={this.state.term} onChange={this.onInputChange} onSubmit={this.onFormSbumit}/>
            <button className="ui blue icon button"><i aria-hidden="true" class="search icon" onClick={this.onFormSbumit}></i></button>
              &nbsp;
            <button className="big ui blue button" onClick={this.onFormSbumit}>&deg;C/&deg;F</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
