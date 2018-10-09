import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../service/WeatherService";

import '../styles/weather.css'
import '../styles/tile.css';
import 'font-awesome/css/font-awesome.min.css';
import SliderBar from "./SliderBar";
import Tile from "./Tile";
import CommonUtil from "../util/CommonUtil";

class WeatherWidget extends React.Component {

  constructor(props) {
    super(props);

    this.loadingContainer = this.getLoadingContainer();
    this.cachedIntervalForecast = [];

    this.state = {
      container : this.loadingContainer,
      hasData: false,
      sliderPosition : "0"
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
    this.setState({container: this.loadingContainer,});
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
      container: <WeekContainer
          weatherModels={forecast}/>,
      sliderPosition: val
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

  getForecast(timeout = 1000) {
    const fn = () => this.props.weatherService.getFiveDayThreeHourIntervalForecast(this.zipCodeInput.current.value)
        .then(forecast => {
          if (forecast === undefined) {
            return;
          }

          this.cachedIntervalForecast = forecast;

          this.setState({container: <WeekContainer className="widget-load"
                weatherModels={ this.transformToSingleIntervalPoint(this.state.sliderPosition) }/>
            , hasData: true
          });
        }, this.handleError);

    setTimeout(fn, timeout);
  }

  handleError(error){
    //todo: handle errors here
    this.setState({container: this.getErrorContainer(error), hasData: false});
  }

  render() {
    return (
        <div className="weather-widget widget-load">
          <form onSubmit={this.handleZipCodeSubmit}>
            <input className="tile tile-input weather-input"
                   type="text"
                   defaultValue="98007"
                   placeholder="zipcode"
                   ref={this.zipCodeInput}/>
            </form>

          {this.state.container}

          {
            this.state.hasData &&
            (<div className="slider-group widget-load">
            <div className="label label__font weather-date-label slider-label">
              {`${CommonUtil.dateZeroPadding(this.state.sliderPosition)}:00`}
            </div>
            <div>
              <SliderBar position={this.state.sliderPosition} onSliderChange={this.handleSliderChange}/>
            </div>
            </div>)
          }
        </div>

    );
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired
};

export default WeatherWidget;