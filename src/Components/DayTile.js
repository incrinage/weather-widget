import React from "react"
import PropTypes from 'prop-types'
import '../CSS/DayTile.css'

class DayTile extends React.Component {

  render() {
    return (
        <div id="tileDiv">
          {this.props.day}
          <p>Picture placeholder</p>
          {this.props.temp}
        </div>
    )
  }
}

DayTile.proptypes = {
  day: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired
};

export default DayTile;