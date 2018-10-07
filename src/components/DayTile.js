import React from "react"
import PropTypes from 'prop-types'
import '../styles/tile.css'
import '../styles/label.css'

class DayTile extends React.Component {

  render() {
    const time = this.props.time;
    const month = time.getMonth() + 1;
    const dayOfMonth = time.getDate();
    const hours = time.getHours() < 10 ? `0${time.getHours()}`: time.getHours();
    const mins = time.getMinutes() < 10? `0${time.getMinutes()}`: time.getMinutes();
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
            {`${hours}:${mins}`}
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