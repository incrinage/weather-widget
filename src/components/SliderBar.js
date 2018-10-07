import React from 'react';

import '../styles/slider.css'
import PropTypes from "prop-types";

class SliderBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(event) {
    this.props.onSliderChange(event);
  }

  render() {
    return  <div className="slider-container">
      <input type="range"
             className="slider"
             min="0" max="21"
             step="3"
             defaultValue="12"
             onChange={this.handleSliderChange} />
      </div>
  }
}

SliderBar.propTypes = {
  onSliderChange: PropTypes.func.isRequired
};

export default SliderBar;