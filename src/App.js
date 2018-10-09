import React, {Component} from 'react';
import './App.css';
import WeatherWidget from "./components/WeatherWidget";
import MockWeatherService from "./service/MockWeatherService";

class App extends Component {


  constructor(props){
    super(props);
    //this.weatherService = new OpenWeather("4b04e27d6c643f40448d5ab0e2411300");
    this.weatherService = new MockWeatherService();
  }

  render() {
    return (
      <div className="App">
        <WeatherWidget
            weatherService={this.weatherService}
        />
      </div>
    );
  }
}

export default App;