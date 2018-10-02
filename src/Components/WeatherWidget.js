import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../Service/WeatherService";

class WeatherWidget extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      weatherModels: [],
      upToDate: true
    };
    this.getDates.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.zipCode !== this.props.zipCode)
  }

  getDates() {
    this.props.weatherService.getNoonFiveDayForecast(this.props.zipCode).then(models=> {
      this.setState({weatherModels: models});
      this.state.upToDate = true;
    });
  }

  render() {

    //setTimeout(this.getDates, 10000);
    this.getDates();
    let weekContainer;

    if (this.state.upToDate) {
      weekContainer = <WeekContainer weatherModels={this.state.weatherModels}/>;
    } else {
      weekContainer = <WeekContainer weatherModels={[]}/>;
      this.state.upToDate = false; //contents updated, no longer up to date.
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