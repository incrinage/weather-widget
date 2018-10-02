import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../Service/WeatherService";

export class WeatherWidget extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      temp : "",
      weatherModels: []
    };

    this.props.weatherService.getNoonFiveDayForecast(this.props.zipCode).then(models=> {
      console.log(models);
      this.setState({weatherModels: models});
    })
  }

  /*shouldComponentUpdate(nextProps) {
    return (nextProps.zipCode !== this.props.zipCode)
  }*/

  render() {
    return (
        <div style={{position : "relative"}}>
        <WeekContainer weatherModels={this.state.weatherModels}/>
        </div>
    )
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired,
  zipCode: PropTypes.number
};