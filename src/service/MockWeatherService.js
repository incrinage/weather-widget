import WeatherService from "./WeatherService";
import WeatherModel from "../models/WeatherModel";

//This is mock data, for when we don't have API keys/permissions etc, just for demo purposes.
class MockWeatherService extends WeatherService{

  getFiveDayThreeHourIntervalForecast(zipCode) {

    return new Promise((resolve, reject) => {
      const json = require('../json/MockWeatherData.json');
      const intervalMapList = [];
      json.forEach(day => {
        let intervalMap = new Map();
        intervalMapList.push(intervalMap);
        day.forEach(interval => {
          let  weatherModelJson = interval[1];
          let weatherModel = new WeatherModel(
              new Date(weatherModelJson.date),
              weatherModelJson.temp,
              weatherModelJson.id
          );
          intervalMap.set(interval[0], weatherModel);
        });
      });
      resolve(intervalMapList);
    });

  }
}

export default MockWeatherService;