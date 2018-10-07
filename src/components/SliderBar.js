import React from 'react';

import '../styles/slider.css'
import PropTypes from "prop-types";
import WeatherService from "../service/WeatherService";
import WeatherWidget from "./WeatherWidget";

class SliderBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(event) {
    this.props.onSliderChange(event);
  }

  render() {
    return  <div style={{position: "relative"}} className="slidecontainer">
      <input type="range"
             className="slider" id="myRange"
             min="0" max="21"
             defaultValue="0"
             onChange={this.handleSliderChange} />
      </div>
  }
}

SliderBar.propTypes = {
  onSliderChange: PropTypes.func.isRequired
};

export default SliderBar;