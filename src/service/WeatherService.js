class WeatherService {

  constructor() {
    if (this.constructor === WeatherService) {
      throw new TypeError('Abstract class "WeatherService" cannot be instantiated directly.')
    }
  }

  getFiveDayThreeHourIntervalForecast(zipCode) {
    throw new Error("Abstract class WeatherService method must be overridden.");
  }

  validateZipCode(zipCode) {
    return zipCode.length === 5;
  }

}

export default WeatherService;