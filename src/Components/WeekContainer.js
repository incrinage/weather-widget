import React from 'react';
import PropTypes from 'prop-types';

import DayTile from "./DayTile";
import DateUtil from "../DateUtil";

import '../CSS/WeatherContainer.css'
import 'font-awesome/css/font-awesome.min.css';


class WeekContainer extends React.Component {

  render() {

    let listItems;

    if (this.props.weatherModels.length === 0) {
      listItems =
          Array.from(Array(5).keys()).map((index) => <li style={{float: "left"}} key={index}>
            <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "24px"}}/>
          </li>)

    } else {
      listItems = this.props.weatherModels
          .map((weatherModel, index) =>
              <li style={{float: "left"}} key={index}>
                <DayTile
                    day={DateUtil.getWeekDay(weatherModel.date.getDay())}
                    temp={weatherModel.temp}/>
              </li>
          );
    }

    return (
        <div id="widgetDiv">
          <ul style={{ listStyleType: "none" }}>
           {listItems}
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