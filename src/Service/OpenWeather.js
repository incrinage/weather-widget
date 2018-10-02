import WeatherService from "./WeatherService";
import WeatherModel from "../Models/WeatherModel";
import DateUtil from "../DateUtil";

class OpenWeather extends WeatherService {

  units = "imperial";

  constructor(apiKey) {
    super();
    this.apiKey=apiKey;
    this.endpoint = 'http://api.openweathermap.org/data/2.5/';
  }

  getCurrentWeather(zipCode) {
    const query = `${this.endpoint}weather?zip=${zipCode}&units=${this.units}&APPID=${this.apiKey}`
    return fetch(query)
      .then(response => response.json())
      .then(weather => new WeatherModel(DateUtil.epochSecondsToMs(weather.dt), weather.main.temp))
  }

  getNoonFiveDayForecast(zipCode) {
    const query = `${this.endpoint}forecast?zip=${zipCode}&units=${this.units}&APPID=${this.apiKey}`
    return fetch(query)
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

}

export default OpenWeather;