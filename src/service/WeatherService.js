class WeatherService {
  constructor() {
    if (this.constructor === WeatherService) {
      throw new TypeError('Abstract class "WeatherService" cannot be instantiated directly.');
    }
  }

  /**
   * Returns an array of maps containing WeatherModels.
   * Each key in the map is a value x such that (0 <= x <= 21).
   * @param zipCode
   */
  getFiveDayThreeHourIntervalForecast() {
    throw new Error('Abstract class WeatherService method must be overridden.');
  }

  validateZipCode(zipCode) {
    return zipCode.length === 5;
  }
}

export default WeatherService;
