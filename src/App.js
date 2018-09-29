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
  componentDidMount() {
    const weatherService = new WeatherService(98004, "imperial", "4b04e27d6c643f40448d5ab0e2411300");
    weatherService.getCurrentWeather().then(weather => {
      this.setState({temp: weather.temp});
    });
  }
  render() {
    console.log("Current temp is :" + this.state.temp);
    return (
      <div className="App">
          <WeatherWidget numDays={5}/>
      </div>
    );
  }
}

export default App;
