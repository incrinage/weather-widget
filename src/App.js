import React, {Component} from 'react';
import './App.css';
import {WeatherWidget} from "./Components/WeatherWidget";
import {OpenWeather} from "./Service/OpenWeather";

class App extends Component {
  weatherService = new OpenWeather(98004, "imperial", "4b04e27d6c643f40448d5ab0e2411300");

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <WeatherWidget
                       weatherService={this.weatherService}
                       numDays={5}
                       />
      </div>
    );
  }
}

export default App;
