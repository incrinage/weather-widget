import WeatherService from "./WeatherService";
import WeatherModel from "../models/WeatherModel";
import DateUtil from "../DateUtil";

class OpenWeather extends WeatherService {

  units = "imperial";

  static intervalSet = new Set([0, 3, 6, 9, 12, 15, 18, 21]); //TODO: use neat javascript tricks to init this
  static MIN = 0;
  static MAX = 1;

  constructor(apiKey) {
    super();
    this.apiKey=apiKey;
    this.endpoint = 'http://api.openweathermap.org/data/2.5/';
  }

  getFiveDayThreeHourIntervalForecast(zipCode) {
    if (!this.isZipCode(zipCode)) {
      return Promise.resolve();
    }
    const query = `${this.endpoint}forecast?zip=${zipCode}&units=${this.units}&APPID=${this.apiKey}`;
    return fetch(query)
      .then((response) => {
        if(!response.ok) {
          throw new Error(response.status)
        }
        return response.json();
      })
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

        const sortedWeatherDays = Array.from(weatherMap).sort((a,b) => {
          return a[1].dt - b[1].dt
        }).map(item =>  { return item[1].intervalMap });

        /* take care of first and last day not having all intervals, round earlier intervals to the nearest interval
         * and repeat that temp but with actual date
         */

        this.populateMissingIntervals(sortedWeatherDays);

        console.log(sortedWeatherDays);

        return sortedWeatherDays;
      })
  }

  populateMissingIntervals(sortedWeatherDays) {
    this.populateDayMissingIntervals(sortedWeatherDays, OpenWeather.MIN);
    this.populateDayMissingIntervals(sortedWeatherDays, OpenWeather.MAX);
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

    const difference = new Set([...OpenWeather.intervalSet]
        .filter(interval => !(intervalMapKeys).has(interval)));

    if (difference.size > 0) {
      const boundInterval = boundIntervalFn(...intervalMapKeys);
      const repeatedModel = intervalMap.get(boundInterval);
      difference.forEach(interval => {
        // minus 60 milliseconds * 60 seconds * (<MIN or MAX>Interval - <current interval>)
        const realDate = new Date(repeatedModel.date.getTime() - (1000*60*60*(boundInterval - interval)));
        intervalMap.set(interval, new WeatherModel(realDate, repeatedModel.temp, repeatedModel.id));
      })
    }
  }

  isZipCode(zipCode) {
    return typeof zipCode === "string" && zipCode.length === 5;
  }
}

export default OpenWeather;