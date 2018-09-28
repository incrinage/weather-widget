import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/WeatherWidget.css'

export class WeatherWidget extends React.Component {
  days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  constructor(props) {
    super(props);
    this.days = this.days.splice(0, this.props.numDays)
  }

  render() {

    const numDays = this.props.numDays;

    const items = Array(numDays).fill(this.days).map((el, i) =>
      <li style={{ float: "left" }} key={i}>
        <a>{el[i]}</a>
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