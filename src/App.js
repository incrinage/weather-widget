import React, {Component} from 'react';
import './App.css';
import {WeatherWidget} from "./Components/WeatherWidget";
import WeatherService from './WeatherService.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        temp: ""
    }
  }

  getForecast() {
    const weatherService = new WeatherService(98004, "imperial", "4b04e27d6c643f40448d5ab0e2411300");
    return weatherService.getCurrentWeather();
  }

  render() {
    return (
      <div className="App">
        <WeatherWidget forecast={this.getForecast()} numDays={5}/>
      </div>
    );
  }
}

export default App;
