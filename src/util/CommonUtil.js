import weather from '../svg/index';

export default class CommonUtil {
  static days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].reduce((result, day, index) => {
    result[index] = day;
    return result;
  }, {});

  static getWeekDay(num) {
    return this.days[num];
  }

  static dateZeroPadding(num) {
    return num < 10 ? `0${num}` : num;
  }

  // condition codes used:
  // https://openweathermap.org/weather-conditions
  // TODO: standardize an id to make it more abstract
  static getWeatherCondition(id, hours) {
    if (id >= 801 && id <= 804) {
      return hours >= 18 ? weather.cloudyNight : weather.cloudyDay;
    } if (id === 800) {
      return hours >= 18 ? weather.night : weather.sunny;
    } if (id >= 500 && id <= 531) {
      return weather.rain;
    }
    return weather.cloudyDay;
  }
}
