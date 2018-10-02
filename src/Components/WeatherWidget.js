import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../Service/WeatherService";

class WeatherWidget extends React.Component {

  readyToUpdate = false;

  constructor(props){
    super(props);
    this.state = {
      weatherModels: []
    };
    this.getDates = this.getDates.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.zipCode !== this.props.zipCode) || this.readyToUpdate
  }

  getDates() {
    this.props.weatherService.getNoonFiveDayForecast(this.props.zipCode).then(models=> {
      this.readyToUpdate = true;
      this.setState({weatherModels: models});
    });
  }

  render() {

    setTimeout(this.getDates, 2000);

    let weekContainer;

    if (this.readyToUpdate) {
      weekContainer = <WeekContainer weatherModels={this.state.weatherModels}/>;
      this.readyToUpdate = false; //contents updated, no longer up to date.
    } else {
      weekContainer = <WeekContainer weatherModels={[]}/>; //causes loading message in container
    }

    return (
        <div style={{position : "relative"}}>
          {weekContainer}
        </div>
    )
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired,
  zipCode: PropTypes.number
};

export default WeatherWidget;