import React from 'react';

// import Grid from 'material-ui/Grid';
import './weather.css';
import Config from '../config.js';

import axios from 'axios';

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      lon: 0,
      lat: 0,
      API_KEY: Config.apiKey
    }
  }



componentDidMount() {
  console.log('getting weather data');
  let geoLocate = document.getElementById("weather");

  let getLocation = () => {
    console.log('init fn')
      if (navigator.geolocation) {
        console.log('geo success')
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log('failed')
        alert('Your browser does not support geolocation')
          geoLocate.innerHTML = "Geolocation is not supported by this browser.";
      }
  }

   let showPosition = (position) => {
    console.log('show position')
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });

      getForecast();
  }

  getLocation();
  let getForecast = () => {
    axios.get(`https://api.wunderground.com/api/${this.state.API_KEY}/conditions/forecast/q/${this.state.lat},${this.state.lon}.jsonp `)
      .then((data) => {
        console.log(data);
        this.setState({
          forecast: data.data
        })
      })
  }
}

  render() {
    return (
      <div id="weather">
        { this.state.forecast === null &&
          <h3>Getting your weather report</h3>
        }
        { this.state.forecast !== null &&
          <div className="forecast">
            <div className="icon">
              <img src={this.state.forecast.forecast.simpleforecast.forecastday[0].icon_url} alt=""/>
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
              <p>Winds: {this.state.forecast.current_observation.wind_mph} MPH</p>
              <p>Wind Direction: {this.state.forecast.current_observation.wind_dir}</p>
              <p>Humidity: {this.state.forecast.current_observation.relative_humidity}</p>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Weather;
