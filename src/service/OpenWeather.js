import WeatherService from "./WeatherService";
import WeatherModel from "../models/WeatherModel";
import DateUtil from "../DateUtil";

class OpenWeather extends WeatherService {

  units = "imperial";

  static intervalSet = new Set([0, 3, 6, 9, 12, 15, 18, 21]); //TODO: use neat javascript tricks to init this

  constructor(apiKey) {
    super();
    this.apiKey=apiKey;
    this.endpoint = 'http://api.openweathermap.org/data/2.5/';
  }

  getCurrentWeather(zipCode) {
    if(!this.isZipCode(zipCode)){
      return Promise.resolve([]);
    }
    const query = `${this.endpoint}weather?zip=${zipCode}&units=${this.units}&APPID=${this.apiKey}`
    return fetch(query)
      .then(response => response.json())
      .then(weather => new WeatherModel(DateUtil.epochSecondsToMs(weather.dt), weather.main.temp))
  }

  getNoonFiveDayForecast(zipCode) {
    if (!this.isZipCode(zipCode)) {
      return Promise.resolve([]);
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
        console.log(fiveDayForecast);
        const daySet = new Set();
        const fiveDayNoonForecast = [];
        fiveDayForecast.list.forEach(day => {
          const date = DateUtil.epochSecondsToMs(day.dt);
          const NOON = 12;
          if (!daySet.has(date.getDay()) && date.getHours() >= NOON) {
            daySet.add(date.getDay());
            fiveDayNoonForecast.push(new WeatherModel(date, day.main.temp, day.weather[0].id));
          }
        });
        return fiveDayNoonForecast;
      })
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
            weatherMapValue = {};
            weatherMapValue.intervalMap = new Map();
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

        /* take care of first day not having all intervals, round earlier intervals to the nearest interval and repeat
         * that but with actual date
         */
        const firstDayIntervalMapKeys = new Set(sortedWeatherDays[0].keys());
        const difference = new Set([...OpenWeather.intervalSet]
            .filter(interval => !(firstDayIntervalMapKeys).has(interval)));

        if (difference.size > 0) {
          const firstDayIntervalMap = sortedWeatherDays[0];
          const minInterval = Math.min(...firstDayIntervalMapKeys);
          const repeatedModel = firstDayIntervalMap.get(minInterval);
          difference.forEach(interval => {
            // minus 60 milliseconds * 60 seconds * (minInterval - <current interval>)
            const realDate = new Date(repeatedModel.date.getTime() - (1000*60*60*(minInterval - interval)));
            firstDayIntervalMap.set(interval, new WeatherModel(realDate, repeatedModel.temp, repeatedModel.id));
          })
        }

        return sortedWeatherDays;
      })
  }

  isZipCode(zipCode) {
    return typeof zipCode === "string" && zipCode.length === 5;
  }
}

export default OpenWeather;