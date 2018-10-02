import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../Service/WeatherService";

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      fetchFailed: false,
      isLoading: true,
      zipCode: this.props.zipCode
    };
  }

  componentDidMount() {
    this.getForecast();
  }

  shouldComponentUpdate(nextProps){
    return nextProps.zipCode !== this.props.zipCode;
  }

  getForecast() {
    console.log("in here")
    this.props.weatherService.getNoonFiveDayForecast(this.props.zipCode).then(forecast => {
      // if(this.state.zipCode !== this.props.zipCode)
        this.setState({forecast: forecast, isLoading: false, fetchFailed: false});
    }, () => {
      //todo: handle errors here
      this.setState({fetchFailed: true, isLoading: false})
    });
  }

  render() {
    console.log("render weather widget");
    this.getForecast()
    if (this.state.fetchFailed) {
      return (<div>Failed to get weather</div>)
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