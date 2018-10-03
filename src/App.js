import React, {Component} from 'react';
import './App.css';
import WeatherWidget from "./Components/WeatherWidget";
import OpenWeather from "./Service/OpenWeather";

class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      zipCode : "98007"
    };
    this.weatherService = new OpenWeather("4b04e27d6c643f40448d5ab0e2411300");
    this.zipCode = "";
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    this.setState({zipCode: this.zipCode});
    event.preventDefault();
  }

  handleChange(event) {
    this.zipCode = event.target.value;
  }

  render() {
    return (
      <div className="App">
        <WeatherWidget
            weatherService={this.weatherService}
            zipCode={this.state.zipCode}
        />
        <div style={{position : "relative"}}>
        <form
            onSubmit={this.handleSubmit}
        >
          <input type="text"  defaultValue={this.state.zipCode} onChange={this.handleChange}/>
        </form>
        </div>
      </div>
    );
  }
}

export default App;