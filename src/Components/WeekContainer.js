import React from 'react';
import PropTypes from 'prop-types';

import DayTile from "./DayTile";
import DateUtil from "../DateUtil";

import '../CSS/WeatherContainer.css'
import 'font-awesome/css/font-awesome.min.css';

class WeekContainer extends React.Component {

  render() {
    let listItems;
    listItems = this.props.weatherModels
        .map((weatherModel, index) =>
            <li style={{float: "left"}} key={index}>
              <DayTile
                  day={DateUtil.getWeekDay(weatherModel.date.getDay())}
                  temp={weatherModel.temp}/>
            </li>
        );

    return (
        <div id="containerDiv">
          <ul style={{ listStyleType: "none" }}>
           {listItems}
          </ul>
        </div>
    );
  }
}


WeekContainer.propTypes = {
  weatherModels: PropTypes.arrayOf(
    PropTypes.shape({date: PropTypes.instanceOf(Date), temp: PropTypes.number, icon: PropTypes.any})
  )
};

export default WeekContainer;