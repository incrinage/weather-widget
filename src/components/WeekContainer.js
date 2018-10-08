import React from 'react';
import PropTypes from 'prop-types';

import DayTile from "./DayTile";

import '../styles/weather.css'
import 'font-awesome/css/font-awesome.min.css';

function WeekContainer(props) {
  return (
      <div className="weather-widget-container">
         {
           props.weatherModels
               .map((weather, index) =>
                   <div key={index}>
                     <DayTile weather={weather} />
                   </div>
               )
         }
      </div>
  );
}

WeekContainer.propTypes = {
  weatherModels: PropTypes.arrayOf(
    PropTypes.shape({date: PropTypes.instanceOf(Date), temp: PropTypes.number, icon: PropTypes.any})
  )
};

export default WeekContainer;