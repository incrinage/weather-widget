import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../service/WeatherService";

import '../styles/weather.css'
import '../styles/weather.css';
import '../styles/tile.css';
import 'font-awesome/css/font-awesome.min.css';
import SliderBar from "./SliderBar";

class WeatherWidget extends React.Component {

  constructor(props) {
    super(props);

    this.loadingContainer = this.getLoadingContainer();
    this.errorContainer = this.getErrorContainer();

    this.cachedIntervalForecast = [];

    this.state = {
      container : this.loadingContainer,
      sliderPosition : 0
    };

    this.handleError = this.handleError.bind(this);

    this.zipCodeInput = React.createRef();
    this.handleZipCodeSubmit = this.handleZipCodeSubmit.bind(this);

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.transformToSingleIntervalPoint = this.transformToSingleIntervalPoint.bind(this);
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
    const forecast = this.transformToSingleIntervalPoint(event.target.value);

    if (forecast.length === 0) {
      return;
    }

    this.setState({
      container: <WeekContainer
          weatherModels={forecast}/>
    });

  }

  //container JSX

  getLoadingContainer() {
    return (
            <div className="weather-widget">
              <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "24px"}}/>
            </div>
        );
  }

  getErrorContainer() {
    return <div>Failed to get weather</div>
  }

  transformToSingleIntervalPoint(interval) {
    const arr = [];
    this.cachedIntervalForecast.forEach(map => {
      const weather = map.get(parseInt(interval, 10));

      if (weather === undefined) { //if any intervals are not in sync, returns.
        return;
      }

      arr.push(weather);

    });
    return arr;
  }

  getForecast() {
    const fn = () => this.props.weatherService.getFiveDayThreeHourIntervalForecast(this.zipCodeInput.current.value)
        .then(forecast => {
          if (forecast === undefined) {
            return;
          }

          this.cachedIntervalForecast = forecast;

          this.setState({container: <WeekContainer
                weatherModels={ this.transformToSingleIntervalPoint(this.state.sliderPosition) }/>
          });
        }, this.handleError);

    setTimeout(fn, 300);
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

          <SliderBar onSliderChange={this.handleSliderChange}/>

        </div>
    );
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired
};

export default WeatherWidget;