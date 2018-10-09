import React from 'react';
import PropTypes from "prop-types";

import CommonUtil from "../util/CommonUtil";
import MockWeatherService from "../service/MockWeatherService";
import SliderBar from "./SliderBar";
import Tile from "./Tile";
import WeekContainer from "./WeekContainer";
import WeatherService from "../service/WeatherService";

import '../styles/weather.css'
import '../styles/tile.css';
import 'font-awesome/css/font-awesome.min.css';

class WeatherWidget extends React.Component {

  constructor(props) {
    super(props);

    this.loadingContainer = this.getLoadingContainer();
    this.cachedIntervalForecast = [];

    this.state = {
      container : undefined
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
    this.setState({container: this.loadingContainer});
    event.preventDefault();
  }

  //slider handling

  handleSliderChange(event) {
    const val = event.target.value;
    const forecast = this.transformToSingleIntervalPoint(val);

    if (forecast.length === 0) {
      return;
    }

    this.setState({
      container: this.getWeekContainer(forecast, val)
    });
  }

  getLoadingContainer() {
    return (
            <div className="weather-widget-container">
              <div className="weather-loading-container">
                <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "24px"}}/>
              </div>
            </div>
        );
  }

  getErrorContainer(error) {
    return (
      <Tile className="day-tile error-tile">
        <div>
          {error.message}
        </div>
      </Tile>
    )
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

  getWeekContainer(forecast, sliderPosition = "0") {
    return (
      <div>
        <WeekContainer className="widget-load"
                       weatherModels={forecast}/>
        <div className="slider-group widget-load">
          <div className="label label__font weather-date-label slider-label">
            {`${CommonUtil.dateZeroPadding(sliderPosition)}:00`}
          </div>
          <div>
            <SliderBar position={sliderPosition} onSliderChange={this.handleSliderChange}/>
          </div>
        </div>
      </div>
    );
  }

  getForecast() {
    const fn = () => this.props.weatherService.getFiveDayThreeHourIntervalForecast(this.zipCodeInput.current.value)
        .then(forecast => {
          if (forecast === undefined) {
            return;
          }
          this.cachedIntervalForecast = forecast;
          this.setState({
            container: this.getWeekContainer(this.transformToSingleIntervalPoint(0))
          });
        }, this.handleError);

    setTimeout(fn, 300);
  }

  handleError(error){
    //todo: handle errors here
    this.setState({container: this.getErrorContainer(error)});
  }

  render() {
    return (
        <div className="weather-widget widget-load">
          <form onSubmit={this.handleZipCodeSubmit}>
            <input className="tile tile-input weather-input"
                   type="text"
                   defaultValue="98007"
                   placeholder="zipcode"
                   ref={this.zipCodeInput}
            />
            </form>
          {this.state.container}
        </div>
    );
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired
};

WeatherWidget.defaultProps = {
  weatherService: new MockWeatherService()
};

export default WeatherWidget;