import React, {Component} from 'react';
import './styles/App.css';
import WeatherWidget from "./components/WeatherWidget";
import OpenWeather from "./service/OpenWeather";

class App extends Component {


  constructor(props){
    super(props);
    this.weatherService = new OpenWeather("4b04e27d6c643f40448d5ab0e2411300");
  }

  renderKeyInput() {
    return (
      <input className="tile tile-input">
    </input>
    )
  }

  render() {
    return (
      <div className="App">
        {this.renderKeyInput()}
        <WeatherWidget
            weatherService={this.weatherService}
        />
      </div>
    );
  }
}

export default App;