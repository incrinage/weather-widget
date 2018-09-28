import React from "react"
import PropTypes from 'prop-types'
import '../CSS/DayTile.css'

export class DayTile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="tileDiv">
          {this.props.day}
        </div>
    )
  }
}

DayTile.proptypes = {
  day: PropTypes.string
};