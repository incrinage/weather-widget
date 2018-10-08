import React from "react"
import PropTypes from 'prop-types'

import CommonUtil from "../CommonUtil";
import WeatherModel from "../models/WeatherModel";
import Tile from "./Tile";

import '../styles/tile.css'
import '../styles/label.css'

function DayTile(props) {

  const weather = props.weather;
  const date = weather.date;
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return (
    <Tile className="day-tile">
      <span>
        <div className="label weather-label__margin-top--fold label__font weather-day-label">
          {`${CommonUtil.getWeekDay(date.getDay())} ${month}/${dayOfMonth}`}
        </div>
      </span>
      <div className="weather-display">
        <div className="weather-label weather-label__font" >{Math.round(weather.temp)}</div>
        <img src={CommonUtil.getWeatherCondition(weather.id, date.getHours())} alt="sunny"/>
      </div>
    </Tile>
  )

}

DayTile.proptypes = {
  weather: PropTypes.instanceOf(WeatherModel),
  day: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired
};

export default DayTile;