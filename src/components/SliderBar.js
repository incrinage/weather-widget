import React from 'react';

import '../styles/slider.css'
import PropTypes from "prop-types";
import DateUtil from "../DateUtil";

class SliderBar extends React.Component {

  constructor(props) {
    super(props);
    this.hour = "12:00";
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(event) {
    this.hour = `${DateUtil.dateZeroPadding(event.target.value)}:00`;
    this.props.onSliderChange(event);
  }

  render() {
    return  <div className="slider-container">
      <div className="label label__font weather-date-label slider-label">
        {this.hour}
      </div>
      <div>
        <input type="range"
               className="slider"
               min="0" max="21"
               step="3"
               defaultValue={this.hour}
               onChange={this.handleSliderChange} />
      </div>
    </div>
  }
}

SliderBar.propTypes = {
  onSliderChange: PropTypes.func.isRequired
};

export default SliderBar;