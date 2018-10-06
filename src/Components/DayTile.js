import React from "react"
import PropTypes from 'prop-types'
import '../CSS/DayTile.css'

class DayTile extends React.Component {

  render() {
    return (
      <div className="tile day-tile">
        <span>
          <div className="label label__margin-top--fold label__font">{this.props.day}</div>
        </span>
        <p>Picture placeholder</p>
        <p>{this.props.temp}</p>
      </div>
    )
  }
}

DayTile.proptypes = {
  day: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired
};

export default DayTile;