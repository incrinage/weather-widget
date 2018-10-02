import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/WeatherContainer.css'
import DayTile from "./DayTile";
import WeatherModel from "../Models/WeatherModel";

class WeekContainer extends React.Component {
  days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  constructor(props) {
    super(props);

    this.dayMap = this.days.reduce(function(result, day, index) {
      result[index] = day;
      return result;
    }, {})
  }

  render() {
    const items = this.props.weatherModels
        .map((weatherModel, index) =>
            <li style={{float: "left"}} key={index}>
              <DayTile day={this.dayMap[weatherModel.date.getDay()]}/>
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


WeekContainer.propTypes = {
  weatherModels: PropTypes.arrayOf(
      PropTypes.shape({date: PropTypes.instanceOf(Date), temp: PropTypes.number})
  )
};

export default WeekContainer;