import React, {Component} from 'react';
import logo from './logo.svg';
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
    const weatherService = new WeatherService(98004, "imperial", "yourApiKey");
    weatherService.getCurrentWeather().then(weather => {
      this.setState({temp: weather.temp});
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
            <div>
                Current temp is : {this.state.temp}
            </div>
        </header>

        <p>
          <WeatherWidget numDays={5}/>
        </p>
      </div>
    );
  }
}

export default App;
