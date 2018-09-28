import React from "react"
import PropTypes from 'prop-types'

export class DayTile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <a>{this.props.day}</a>
    )
  }
}

DayTile.proptypes = {
  day: PropTypes.string
};