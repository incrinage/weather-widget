import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {WeatherWidget} from "./Components/WeatherWidget";
import WeatherService from './WeatherService.js'

class App extends Component {
  constructor(props){
      super(props)
    this.state = {
        temp: ""
    }
  }
  componentDidMount() {
    const weatherService = new WeatherService(98004,"imperial", "4b04e27d6c643f40448d5ab0e2411300");
    weatherService.getCurrentWeather().then(temp => {
      this.setState({temp});
    })
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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <p>
          <WeatherWidget numDays={5}/>
        </p>
      </div>
    );
  }
}

export default App;
