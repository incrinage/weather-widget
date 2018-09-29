import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/WeatherWidget.css'
import {DayTile} from "./DayTile";

export class WeatherWidget extends React.Component {
  days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  constructor(props) {
    super(props);
    this.state = {
      temp : ""
    };
    this.days = this.days.splice(0, this.props.numDays);
  }

  componentDidMount(){
    this.props.forecast.then(weather=> {
        this.setState({temp: weather.temp})
    })
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
    numDays: PropTypes.number
};

WeatherWidget.defaultProps = {
  numDays: 5
};