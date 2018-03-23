import React from 'react';

// API
import Config from '../config.js';
import axios from 'axios';

// Styling
import Grid from 'material-ui/Grid';
import '../../../src/weather-icons.css';
import '../../../src/weather-icons-wind.css';
import './weather.css';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      lon: 0,
      lat: 0,
      greeting: '',
      API_KEY: Config.apiKey
    }
  }



componentDidMount() {

  this.getGreeting();

  // set location for HTML geolocate
  let geoLocate = document.getElementById("weather");

  // get lon and lat
  let getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      geoLocate.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  // set coords to state
   let showPosition = (position) => {
    this.setState({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });

    // call to api
    getForecast();
  }

  getLocation();

  // api call to weather underground: append lon, lat, and apikey to query string.
  let getForecast = () => {
    axios.get(`https://api.wunderground.com/api/${this.state.API_KEY}/conditions/forecast/q/${this.state.lat},${this.state.lon}.jsonp `)
      .then((data) => {
        this.setState({
          forecast: data.data
        })
      })
  }
}

// check the time, and return a gretting based on time of day
getGreeting() {
  let time = new Date().getHours();

  if (time <= 11) {
    this.setState({
      greeting: 'Good Morning'
    });
  }
  else if (time > 11 && time <= 15) {
    this.setState({
      greeting: 'Good Afternoon'
    });
  }
  else {
    this.setState({
      greeting: 'Good Evening'
    });
  }
}

  render() {
    return (
      <Grid container spacing={8} justify='center'>
        <Grid item xs={11} md={6} lg={4}>
          { this.state.forecast === null &&
          <div className="loading">
            <h3>{ this.state.greeting }. Grabbing your forecast for today.</h3>
            <div className="horizon">
              <i className="wi wi-day-sunny"></i>
              <div className="horizon-line"></div>
            </div>
          </div>
          }
          { this.state.forecast !== null &&
          <div id="weather">
            <div className="forecast">
              <div className="icon">
                <i className={`wi wi-wu-${this.state.forecast.current_observation.icon}`}></i>
              </div>
              <div className="forecast-info">
                <p className="temp">{Math.round(this.state.forecast.current_observation.temp_f)}°F</p>
                <div className="middle">
                  <p className="conditions">{this.state.forecast.current_observation.weather}</p>
                  <p className="city">{this.state.forecast.current_observation.display_location.city}, {this.state.forecast.current_observation.display_location.state}</p>
                </div>
                <div className="date">
                  <p>{this.state.forecast.forecast.simpleforecast.forecastday[0].date.monthname}</p>
                  <p>{this.state.forecast.forecast.simpleforecast.forecastday[0].date.day}</p>
                </div>
              </div>
              <div className="additional-forecast">
                <span><i className="wi wi-strong-wind"></i> {this.state.forecast.current_observation.wind_mph} MPH</span>
                <span><i className="wi wi-wind wi-from-s"></i>{this.state.forecast.current_observation.wind_dir} </span>
                <span><i className="wi wi-humidity"></i> {this.state.forecast.current_observation.relative_humidity}</span>
              </div>
            </div>
          </div>
          }
        </Grid>
      </Grid>
    )
  }
}

export default Weather;
