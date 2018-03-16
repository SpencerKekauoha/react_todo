import React from 'react';
import { Link } from "react-router-dom";

// Styles
import Grid from 'material-ui/Grid';
import '../../../src/weather-icons.css';
import './home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      greeting: '',
      icon: '',
      greetingClass: ''
    }
  }

  componentDidMount() {
    this.getGreeting();
  }

  // check the time, and return a gretting based on time of day
  getGreeting() {
    let time = new Date().getHours();

    if (time <= 11) {
      this.setState({
        greeting: 'Good Morning',
        icon: 'wi-sunrise',
        greetingClass: 'morning'
      });
    }
    else if (time > 11 && time <= 15) {
      this.setState({
        greeting: 'Good Afternoon',
        icon: 'wi-day-sunny',
        greetingClass: 'noon'
      });
    }
    else {
      this.setState({
        greeting: 'Good Evening',
        icon: 'wi-moon-waning-crescent-4',
        greetingClass: 'evening'
      });
    }
  }

  render() {

    return (
      <Grid container spacing={8} justify='center'>
        <Grid item xs={11} md={6} lg={4}>
          <div className="welcome">
            <div className={`greeting ${this.state.greetingClass}`}>
              <h1>{this.state.greeting}.</h1>
              <i className={`wi ${this.state.icon}`}></i>
            </div>
            <div className="links">
              <Link to='/list'>To Do</Link>
              <Link to='/weather'>Weather</Link>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default Home;
