import React from 'react';
import PropTypes from "prop-types";

import WeekContainer from "./WeekContainer";
import WeatherService from "../Service/WeatherService";

import '../CSS/SliderBar.css'
import '../CSS/WeatherContainer.css'

import 'font-awesome/css/font-awesome.min.css';

class WeatherWidget extends React.Component {

  constructor(props) {
    super(props);

    this.loadingContainer = this.renderLoading();

    this.state = {
      container : this.loadingContainer
    };

    this.zipCode = "98007";
    this.fetchFailed = false;

    this.handleError = this.handleError.bind(this);

    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleZipCodeSubmit = this.handleZipCodeSubmit.bind(this);
  }

  componentDidMount() {
    this.getForecast();
  }

  handleZipCodeSubmit(event) {
    this.setState({container : this.loadingContainer});
    this.getForecast();
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
        <input type="text"  defaultValue={this.zipCode} onChange={this.handleZipCodeChange}/>
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

    const fn = () => this.props.weatherService.getNoonFiveDayForecast(this.zipCode).then(forecast => {
          this.fetchFailed = false;
          this.setState({container: <WeekContainer weatherModels={forecast}/>});
        }, this.handleError);

    setTimeout(fn, 300);
  }

  handleError(error){
    //todo: handle errors here
    this.fetchFailed = true;
    this.forceUpdate();
  }

  render() {

    if (this.fetchFailed) {
      this.fetchFailed = false;
      return (<div> {this.renderZipCode()} Failed to get weather</div>)
    }

    return (
        <div style={{position: "relative"}}>

          {this.renderZipCode()}

          {this.state.container}

          <div className="slidecontainer">
            <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
          </div>

        </div>
    );
  }
}

WeatherWidget.propTypes = {
  weatherService: PropTypes.instanceOf(WeatherService).isRequired
};

export default WeatherWidget;