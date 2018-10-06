import WeatherService from "./WeatherService";
import WeatherModel from "../models/WeatherModel";
import DateUtil from "../DateUtil";

class OpenWeather extends WeatherService {

  units = "imperial";

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
        return response;
      })
      .then(response => response.json())
      .then(fiveDayForecast => {
        const daySet = new Set();
        const fiveDayNoonForecast = [];
        fiveDayForecast.list.forEach(day => {
          const date = DateUtil.epochSecondsToMs(day.dt);
          const NOON = 12;
          if (!daySet.has(date.getDay()) && date.getHours() >= NOON) {
            daySet.add(date.getDay());
            fiveDayNoonForecast.push(new WeatherModel(date, day.main.temp));
          }
        });
        return fiveDayNoonForecast;
      })
  }

  isZipCode(zipCode) {
    return typeof zipCode === "string" && zipCode.length === 5;
  }
}

export default OpenWeather;