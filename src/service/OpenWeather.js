import WeatherService from "./WeatherService";
import WeatherModel from "../models/WeatherModel";

class OpenWeather extends WeatherService {

  units = "imperial";

  static intervalSet = new Set([0, 3, 6, 9, 12, 15, 18, 21]); //TODO: use neat javascript tricks to init this
  static MIN = 0;
  static MAX = 1;

  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
    this.endpoint = 'http://api.openweathermap.org/data/2.5/';
    this.populateWeatherModels = this.populateWeatherModels.bind(this);
    this.populateMissingIntervals = this.populateMissingIntervals.bind(this);
  }

  getFiveDayThreeHourIntervalForecast(zipCode) {
    return Promise.resolve()
      .then(() => {
        this.validateZipCode(zipCode);
        return `${this.endpoint}forecast?zip=${zipCode}&units=${this.units}&APPID=${this.apiKey}`;
      })
      .then(this.fetchWeather)
      .then(this.populateWeatherModels)
      .then(this.populateMissingIntervals)
  }

  fetchWeather(query){
    return fetch(query)
      .then((response) => {
        // todo: provide status codes where needed to handle errors gracefully
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json();
      });
  }

  populateWeatherModels(fiveDayForecast) {
    return Promise.resolve(fiveDayForecast)
      .then(fiveDayForecast => {
        const weatherMap = new Map(); //day of the week getDay() as unique key
        fiveDayForecast.list.forEach(day => {
          const date = new Date(day.dt_txt);
          let weatherMapValue = weatherMap.get(date.getDay());
          let curWeather = new WeatherModel(date, day.main.temp, day.weather[0].id);
          if (weatherMapValue === undefined) {
            weatherMapValue = {intervalMap: new Map()};
            const intervalMap = weatherMapValue.intervalMap;
            intervalMap.set(date.getHours(), curWeather);
            weatherMap.set(date.getDay(), {"dt": day.dt, "intervalMap": intervalMap});
          } else {
            weatherMapValue.intervalMap.set(date.getHours(), curWeather);
          }
        });
        return weatherMap;
      })
  }

  populateMissingIntervals(weatherMap) {
    return Promise.resolve().then(() => {
      const sortedWeatherDays = Array.from(weatherMap)
        .sort((a, b) => a[1].dt - b[1].dt)
        .map(item => item[1].intervalMap);

      /*
       * take care of first and last day not having all intervals,
       * round earlier intervals to the nearest interval
       * and repeat that temp but with actual date
       */
      // todo: Should we return missing intervals instead?
      this.populateDayMissingIntervals(sortedWeatherDays, OpenWeather.MIN);
      this.populateDayMissingIntervals(sortedWeatherDays, OpenWeather.MAX);
      return sortedWeatherDays;
    })
  }

  populateDayMissingIntervals(sortedWeatherDays, bound) {
    let intervalMap, intervalMapKeys, boundIntervalFn;

    switch (bound) {
      case OpenWeather.MIN:
        intervalMap = sortedWeatherDays[0];
        intervalMapKeys = new Set(intervalMap.keys());
        boundIntervalFn = Math.min;
        break;
      case OpenWeather.MAX:
        intervalMap = sortedWeatherDays[sortedWeatherDays.length - 1];
        intervalMapKeys = new Set(intervalMap.keys());
        boundIntervalFn = Math.max;
        break;
      default:
        throw new Error("bound must be set to MIN or MAX.");
    }

    const difference = new Set(
      [...OpenWeather.intervalSet]
        .filter(interval => !(intervalMapKeys).has(interval)));

    if (difference.size > 0) {
      const boundInterval = boundIntervalFn(...intervalMapKeys);
      const repeatedModel = intervalMap.get(boundInterval);
      difference.forEach(interval => {
        // minus 60 milliseconds * 60 seconds * (<MIN or MAX>Interval - <current interval>)
        const realDate = new Date(repeatedModel.date.getTime() - (1000 * 60 * 60 * (boundInterval - interval)));
        intervalMap.set(interval, new WeatherModel(realDate, repeatedModel.temp, repeatedModel.id));
      })
    }
  }

  validateZipCode(zipCode) {
    if (!super.validateZipCode(zipCode)) {
      throw new Error("404");
    }
  }
}

export default OpenWeather;