import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../service/WeatherService";

import '../styles/slider.css'

import '../styles/weather.css'
import '../styles/weather.css';
import '../styles/tile.css';
import 'font-awesome/css/font-awesome.min.css';

class WeatherWidget extends React.Component {

  constructor(props) {
    super(props);

    this.loadingContainer = this.getLoadingContainer();
    this.errorContainer = this.getErrorContainer();

    this.state = {
      container : this.loadingContainer
    };

    this.handleError = this.handleError.bind(this);

    this.zipCodeInput = React.createRef();
    this.handleZipCodeSubmit = this.handleZipCodeSubmit.bind(this);

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  componentDidMount() {
    this.getForecast();
  }

  handleZipCodeSubmit(event) {
    this.getForecast();
    this.setState({container : this.loadingContainer});
    event.preventDefault();
  }

  //slider handling

  handleSliderChange(event) {
    if (event.target.value >= 50) {
      console.log(event);
    }
  }

  //container JSX

  getLoadingContainer() {
    return (
            <div id="containerDiv" className="weather-widget">
              <ul style={{ listStyleType: "none" }}>
                {
                  Array.from(Array(5).keys()).map((index) => <li style={{float: "left"}} key={index}>
                    <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "24px"}}/>
                  </li>)
                }
              </ul>
            </div>
        );
  }

  getErrorContainer() {
    return <div>Failed to get weather</div>
  }

  /*
  getForecast() {

    const fn = () => this.props.weatherService.getNoonFiveDayForecast(this.zipCodeInput.current.value)
        .then(forecast => {
          this.setState({container: <WeekContainer weatherModels={forecast}/>});
        }, this.handleError);

    setTimeout(fn, 300);
  }
  */

  transformToSingleIntervalPoint(forecast, interval) {
    return forecast.map(map => map.get(interval));
  }

  getForecast() {
    return this.props.weatherService.getFiveDayThreeHourIntervalForecast(this.zipCodeInput.current.value)
        .then(forecast => {
          console.log(forecast);

          if (forecast === undefined) {
            return;
          }

          this.setState({container: <WeekContainer weatherModels={ this.transformToSingleIntervalPoint(forecast, 0) }/>});
        });
  }



  handleError(error){
    //todo: handle errors here
    this.setState({container: this.errorContainer});
  }

  render() {

    return (
        <div className="weather-widget">

          <div style={{position : "relative"}}>
            <form
                onSubmit={this.handleZipCodeSubmit}
            >
              <input  className="tile tile-input weather-input" type="text"  defaultValue="98007" ref={this.zipCodeInput} />
            </form>
          </div>

          {this.state.container}

          <div style={{position: "relative"}} className="slidecontainer">
            <input type="range" min="0" max="21" value="0" className="slider" id="myRange" onChange={this.handleSliderChange}/>
          </div>

        </div>
    );
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired
};

export default WeatherWidget;