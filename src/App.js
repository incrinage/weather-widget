import React, {Component} from 'react';
import './App.css';
import {WeatherWidget} from "./Components/WeatherWidget";
import {OpenWeather} from "./Service/OpenWeather";

class App extends Component {

  weatherService = new OpenWeather("4b04e27d6c643f40448d5ab0e2411300");

  constructor(props){
    super(props);
    this.state = {
      zipCode : 98007
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    alert(this.state.zipCode);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({zipCode : event.target.value});
  }

  render() {
    return (
      <div className="App">
        <WeatherWidget
            weatherService={this.weatherService}
            zipCode={this.state.zipCode}
        />

        <form
            onSubmit={this.handleSubmit}
        >
          <input type="text" value={this.state.zipCode} onChange={this.handleChange}/>
        </form>

      </div>
    );
  }
}

export default App;