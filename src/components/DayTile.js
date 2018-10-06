import React from "react"
import PropTypes from 'prop-types'
import '../styles/tile.css'
import '../styles/label.css'
import day from '../svg/day.svg'

class DayTile extends React.Component {

  render() {
    return (
      <div className="tile day-tile">
        <span>
          <div className="label label__margin-top--fold label__font">{this.props.day}</div>
        </span>
        <div className="weather-display">
          <div className="weather-label weather-label__font" >{this.props.temp}</div>
          <img src={this.props.icon} alt="sunny"/>
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