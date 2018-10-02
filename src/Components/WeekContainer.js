import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/WeatherContainer.css'
import DayTile from "./DayTile";
import DateUtil from "../DateUtil";

class WeekContainer extends React.Component {

  render() {

    let display;

    if (this.props.weatherModels.length === 0) {
      display = "Loading.....";
    } else {
      const items = this.props.weatherModels
          .map((weatherModel, index) =>
              <li style={{float: "left"}} key={index}>
                <DayTile
                    day={DateUtil.getWeekDay(weatherModel.date.getDay())}
                    temp={weatherModel.temp}/>
              </li>
          );

      display = <ul style={{ listStyleType: "none" }}>
          {items}
        </ul>
    }

    return (
        <div id="widgetDiv">
          {display}
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