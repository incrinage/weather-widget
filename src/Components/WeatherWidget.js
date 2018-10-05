import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../Service/WeatherService";

import '../CSS/WeatherContainer.css'
import 'font-awesome/css/font-awesome.min.css';

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: [],
      zipCode : "98007"
    };

    this.isReady = false;
    this.fetchFailed = false;

    this.handleError = this.handleError.bind(this);

    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleZipCodeSubmit = this.handleZipCodeSubmit.bind(this);
  }

  handleZipCodeSubmit(event) {
    this.setState({zipCode: this.zipCode});
    event.preventDefault();
  }

  handleZipCodeChange(event) {
    this.zipCode = event.target.value;
  }

  renderZipCode() {
    return <div style={{position : "relative"}}>
      <form
          onSubmit={this.handleZipCodeSubmit}
      >
        <input type="text"  defaultValue={this.state.zipCode} onChange={this.handleZipCodeChange}/>
      </form>
    </div>;
  }

  renderLoading() {
    return (
            <div id="containerDiv">
              <ul style={{ listStyleType: "none" }}>
                {
                  Array.from(Array(5).keys()).map((index) => <li style={{float: "left"}} key={index}>
                    <i className="fa fa-circle-o-notch fa-spin" style={{fontSize: "24px"}}/>
                  </li>)
                }
              </ul>
            </div>
        );
  }

  getForecast() {
    this.props.weatherService.getNoonFiveDayForecast(this.state.zipCode).then(forecast => {
      this.isReady = true;
      this.fetchFailed = false;
      this.setState({forecast: forecast});
    }, this.handleError);
  }

  handleError(error){
    //todo: handle errors here
    this.fetchFailed = true;
    this.forceUpdate();
  }

  render() {

    if (this.fetchFailed) {
      this.fetchFailed = false;
      this.isReady = false;
      return (<div> {this.renderZipCode()} Failed to get weather</div>)
    }

    let container;

    if (this.isReady) {
      container = <WeekContainer weatherModels={this.state.forecast}/>;
    } else {
      setTimeout(this.getForecast.bind(this), 500);
      container = this.renderLoading();
    }

    const toRender = (
        <div style={{position : "relative"}}>

          {this.renderZipCode()}

          {container}

        </div>
    );

    this.isReady = false;

    return toRender;
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired
};

export default WeatherWidget;