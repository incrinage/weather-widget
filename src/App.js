import React, { Component } from 'react';
import './styles/App.css';
import WeatherWidget from './components/WeatherWidget';

import MockWeatherService from './service/MockWeatherService';
import OpenWeather from './service/OpenWeather';

class App extends Component {
  constructor(props) {
    super(props);
    const apiKey = localStorage.getItem('apiKey');
    this.weatherService = apiKey ? new OpenWeather(apiKey) : new MockWeatherService();
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
