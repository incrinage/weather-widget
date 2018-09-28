export default class DateUtil {
  static epochSecondsToMs = (time) =>{
    return new Date(time*1000);
  }
}