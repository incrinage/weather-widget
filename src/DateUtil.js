export default class DateUtil {
  static days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"].reduce(function(result, day, index) {
    result[index] = day;
    return result;
  }, {});

  static epochSecondsToMs = (time) =>{
    return new Date(time*1000);
  };

  //gets the day for the weekday
  static getWeekDay(num) {
    return this.days[num];
  }
}