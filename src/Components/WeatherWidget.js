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
      fetchFailed: false
  };
    this.isReady = false;
    this.handleError = this.handleError.bind(this);
  }

  shouldComponentUpdate(nextProps){
    console.log(this.state);
    return (nextProps.zipCode !== this.props.zipCode) || this.isReady || this.state.fetchFailed;
  }

  handleError(error){
    //todo: handle errors here
    this.setState({fetchFailed:true, isLoading: false})
  }

  getForecast() {
    this.props.weatherService.getNoonFiveDayForecast(this.props.zipCode).then(forecast => {
        this.isReady = true;
        this.setState({forecast: forecast, isLoading: false, fetchFailed: false});
    }, this.handleError);
  }

  render() {
    if (this.state.fetchFailed) {
      return (<div>Failed to get weather</div>)
    }
    if(this.isReady){
      this.isReady = false;
    } else {
      this.getForecast();
    }
    return (
        <div style={{position : "relative"}}>
          <WeekContainer isLoading={this.state.isLoading} weatherModels={this.state.forecast}/>
        </div>
    )
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired,
  zipCode: PropTypes.string.isRequired
};

export default WeatherWidget;