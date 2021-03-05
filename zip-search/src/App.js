import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className="City-box">
      <div className="City-name">
        {props.name}
      </div>
      <div className="City-info">
        <ul>
          <li>State: {props.state}</li>
          <li>Location: ( {props.lat}, {props.long})</li>
          <li>Population (estimated): {props.pop}</li>
          <li>Total Wages: {props.tw}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({ onZipChange }) {
  

  return (
    <div className="Input-container">
      <label style={{marginRight: '6px'}}> <strong>Zip Code:</strong> </label>
      <input type="text" onBlur={onZipChange} placeholder="Type in a 5 digit Zip Code"/>
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }

  zipChanged(e) {
    // Make GET request for the zip resource
    // then, when you receive the result, store it in state
    if (e.target.value.length === 5 && !isNaN(Number(e.target.value))) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${e.target.value}`)
        .then(response => {if (response.ok) return response.json(); else return []})
        .then(data => { this.setState({ cities: data }); console.log(data) })
    
      this.setState({ zipCode: e.target.value })
    } else {
      alert('Not a valid Zip code.');
    }
  }

  render() {
    console.log(this.state.cities);
    const contentDisplay = (Array.isArray(this.state.cities) && this.state.cities.length)  ? this.state.cities.map(obj => <City key={obj.RecordNumber} name={obj.LocationText} state={obj.State} lat={obj.Lat} long={obj.Long} pop={obj.EstimatedPopulation} tw={obj.TotalWages} />) : <p className="Input-container">No results</p>

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onZipChange={(e) => this.zipChanged(e)} />
        <div>
          {
            contentDisplay
          }
        </div>
      </div>
    );
  }
}

export default App;
