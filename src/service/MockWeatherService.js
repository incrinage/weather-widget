import WeatherService from './WeatherService';
import WeatherModel from '../models/WeatherModel';
import mockWeatherData from '../json/MockWeatherData.json';
// This is mock data, for when we don't have API keys/permissions etc, just for demo purposes.
class MockWeatherService extends WeatherService {
  getFiveDayThreeHourIntervalForecast(zipCode) {
    return new Promise((resolve, reject) => {
      if(!this.validateZipCode(zipCode)) {
        reject({message:'404'})
      }
      const json = mockWeatherData;
      const intervalMapList = [];
      json.forEach((day) => {
        const intervalMap = new Map();
        intervalMapList.push(intervalMap);
        day.forEach((interval) => {
          const weatherModelJson = interval[1];
          const weatherModel = new WeatherModel(
            new Date(weatherModelJson.date),
            weatherModelJson.temp,
            weatherModelJson.id,
          );
          intervalMap.set(interval[0], weatherModel);
        });
      });
       resolve(intervalMapList);
    });
  }
}

export default MockWeatherService;
