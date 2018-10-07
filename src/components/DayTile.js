import React from "react"
import PropTypes from 'prop-types'
import '../styles/tile.css'
import '../styles/label.css'
import DateUtil from '../DateUtil';

class DayTile extends React.Component {

  render() {
    const time = this.props.time;
    const month = time.getMonth() + 1;
    const dayOfMonth = time.getDate();
    const hours = DateUtil.dateZeroPadding(time.getHours());
    const minutes = DateUtil.dateZeroPadding(time.getMinutes());
    return (
      <div className="tile day-tile">
        <span>
          <div className="label label__margin-top--fold label__font weather-day-label">{`${this.props.day} ${month}/${dayOfMonth}`}</div>
        </span>
        <div className="weather-display">
          <div className="weather-label weather-label__font" >{this.props.temp}</div>
          <img src={this.props.icon} alt="sunny"/>
        </div>
        <div className="label label__margin-bottom--fold label__font weather-date-label">
            {`${hours}:${minutes}`}
        </div>
      </div>
    )
  }
}

DayTile.proptypes = {
  day: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired
};

export default DayTile;