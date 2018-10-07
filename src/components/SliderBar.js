import React from 'react';

import '../styles/slider.css'

class SliderBar extends React.Component {

  render() {
    return  <div style={{position: "relative"}} className="slidecontainer">
      <input type="range" min="0" max="21" value="0" className="slider" id="myRange" onChange={this.handleSliderChange}/>
      </div>
  }
}

export default SliderBar;