import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/WeatherWidget.css'
import {DayTile} from "./DayTile";
import WeatherService from "../WeatherService";

export class WeatherWidget extends React.Component {
  days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  constructor(props) {
    super(props);
    this.state = {
      temp : ""
    };
  }

  componentDidMount(){
    this.props.weatherService.getCurrentWeather().then(weather=> {
      this.setState({temp: weather.temp})
    })
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.numDays !== this.props.numDays)
  }

  render() {

    const numDays = this.props.numDays;

    const items = Array(numDays).fill(this.days).map((days, i) =>
      <li style={{ float: "left" }} key={i}>
        <DayTile day={days[i]} />
      </li>
    );

    return (
        <div id="widgetDiv">
          <ul style={{ listStyleType: "none" }}>
            {items}
            {this.state.temp? console.log(this.state.temp) : console.log("Loading...")}
          </ul>
        </div>
    );
  }
}

WeatherWidget.prototypes = {
  numDays: PropTypes.number,
  weatherService: WeatherService
};

WeatherWidget.defaultProps = {
  numDays: 5
};