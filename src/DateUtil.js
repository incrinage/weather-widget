export default class DateUtil {
  static days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].reduce(function(result, day, index) {
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

  static dateZeroPadding(num){
    return num < 10? `0${num}`: num;
  }
}