import React from 'react';
import PropTypes from 'prop-types';

import DayTile from "./DayTile";
import DateUtil from "../DateUtil";

import '../styles/weather.css'
import 'font-awesome/css/font-awesome.min.css';

class WeekContainer extends React.Component {

  render() {


    return (
        <div className="widget">
           {
             this.props.weatherModels
               .map((weatherModel, index) =>
                   <div key={index}>
                     <DayTile
                         day={DateUtil.getWeekDay(weatherModel.date.getDay())}
                         temp={weatherModel.temp}/>
                   </div>
               )
           }
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