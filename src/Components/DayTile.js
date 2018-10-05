import React from "react"
import PropTypes from 'prop-types'
import '../CSS/DayTile.css'

class DayTile extends React.Component {

  render() {
    return (
      <div>
      <div className="day-tile">

        <span> <div className="day-tile__day">{this.props.day}</div></span>
          <p>Picture placeholder</p>
        <p>{this.props.temp}</p>
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