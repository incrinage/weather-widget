import React from 'react';
import PropTypes from 'prop-types';

import DayTile from "./DayTile";
import DateUtil from "../DateUtil";

import '../styles/weather.css'
import 'font-awesome/css/font-awesome.min.css';
import weather from '../svg';

class WeekContainer extends React.Component {
  // condition codes used:
  // https://openweathermap.org/weather-conditions
  getWeatherCondition(id){
    if(id>= 801 && id <= 804 ){
      return weather.cloudy;
    } else if ( id === 800) {
      return weather.sunny;
    } else if(id >= 500 && id <= 531){
      return weather.rain;
    } else {
      return weather.cloudy;
    }
  }

  render() {

    return (
        <div className="widget">
           {
             this.props.weatherModels
                 .map((weather, index) =>
                     <div key={index}>
                       <DayTile
                           day={DateUtil.getWeekDay(weather.date.getDay())}
                           temp={Math.round(weather.temp)}
                           icon={this.getWeatherCondition(weather.id)}
                       />
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