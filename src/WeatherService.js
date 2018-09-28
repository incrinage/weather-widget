class WeatherService {
  constructor(zipCode, units, apiKey) {
    this.endpoint = 'http://api.openweathermap.org/data/2.5/';
    this.zipCode = zipCode;
    this.units = units;
    this.apiKey = apiKey;
  }

  getCurrentWeather() {
    const query = `${this.endpoint}weather?zip=${this.zipCode}&units=${this.units}&APPID=${this.apiKey}`
    return fetch(query)
      .then(response => response.json())
      .then( weather => weather.main.temp)
  }
}

export default WeatherService;