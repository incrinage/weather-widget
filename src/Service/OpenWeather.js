import WeatherService from "./WeatherService";
import Weather from "../Models/Weather";
import DateUtil from "../DateUtil";

export class OpenWeather extends WeatherService {
  constructor(zipCode, units, apiKey) {
    super(zipCode, units, apiKey);
    this.endpoint = 'http://api.openweathermap.org/data/2.5/';
  }

  getCurrentWeather() {
    const query = `${this.endpoint}weather?zip=${this.zipCode}&units=${this.units}&APPID=${this.apiKey}`
    return fetch(query)
      .then(response => response.json())
      .then(weather => new Weather(DateUtil.epochSecondsToMs(weather.dt), weather.main.temp))
  }

  getNoonFiveDayForecast() {
    const query = `${this.endpoint}forecast?zip=${this.zipCode}&units=${this.units}&APPID=${this.apiKey}`
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
            fiveDayNoonForecast.push(new Weather(date, day.main.temp));
          }
        });
        return fiveDayNoonForecast;
      })
  }

}