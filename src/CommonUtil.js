import weather from "./svg";

export default class CommonUtil {

  //date helpers

  static days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].reduce(function(result, day, index) {
    result[index] = day;
    return result;
  }, {});

  //gets the day for the weekday
  static getWeekDay(num) {
    return this.days[num];
  }

  static dateZeroPadding(num){
    return num < 10? `0${num}`: num;
  }

  //weather helpers

  // condition codes used:
  // https://openweathermap.org/weather-conditions
  //TODO: standardize an id to make it more abstract
  static getWeatherCondition(id, hours) {
    if(id>= 801 && id <= 804 ){
      return hours >= 18 ? weather.cloudyNight : weather.cloudyDay;
    } else if ( id === 800) {
      return hours >= 18 ? weather.night : weather.sunny;
    } else if(id >= 500 && id <= 531){
      return weather.rain;
    } else {
      return weather.cloudyDay;
    }
  }
}