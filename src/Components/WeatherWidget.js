import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../Service/WeatherService";

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      isLoading: true,
  };
    this.fetchFailed = false;
    this.isReady = false;
    this.handleError = this.handleError.bind(this);
  }

  shouldComponentUpdate(nextProps){
    return (nextProps.zipCode !== this.props.zipCode) || this.isReady || this.fetchFailed;
  }

  handleError(error){
    //todo: handle errors here
    this.fetchFailed = true;
    this.setState({ isLoading: false})
  }

  getForecast() {
    this.props.weatherService.getNoonFiveDayForecast(this.props.zipCode).then(forecast => {
        this.isReady = true;
        this.fetchFailed = false;
        this.setState({forecast: forecast, isLoading: false});
    }, this.handleError);
  }

  render() {
    if (this.fetchFailed) {
      this.fetchFailed = false;
      return (<div>Failed to get weather</div>)
    }
    if(this.isReady){
      this.isReady = false;
    } else  {
      this.getForecast();
    }
    return (
          <WeekContainer isLoading={this.state.isLoading} weatherModels={this.state.forecast}/>
    )
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired,
  zipCode: PropTypes.string.isRequired
};

export default WeatherWidget;