import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/WeatherWidget.css'
import {DayTile} from "./DayTile";

export class WeatherWidget extends React.Component {
  days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  constructor(props) {
    super(props);
    this.days = this.days.splice(0, this.props.numDays);
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