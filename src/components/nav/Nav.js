import React from 'react';
import { HashRouter, Route, Link } from "react-router-dom";

import Grid from 'material-ui/Grid';
import Menu, { MenuItem } from 'material-ui/Menu';

import Home from '../home/home.js';
import List from '../list/List.js';
import Weather from '../weather/weather.js';
import './Nav.css';

class Nav extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <HashRouter>
        <div>
          <div className="nav">
            <Grid container spacing={8} alignItems='center' justify='space-between'>
              <Grid item xs={2}>
                <div className="hamburger">
                  <a
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <div className="full-square">
                      <div className="top-left square"></div>
                      <div className="top-right square"></div>
                      <div className="bottom-left square"></div>
                      <div className="bottom-right square"></div>
                    </div>
                  </a>
                </div>
              </Grid>
              <Grid item xs={6}>
                <h1>All Tasks</h1>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </div>

          <div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <Link to="/">
                <MenuItem onClick={this.handleClose}>Home</MenuItem>
              </Link>
              <Link to="/list">
                <MenuItem onClick={this.handleClose}>To do</MenuItem>
              </Link>
              <Link to="/weather">
                <MenuItem onClick={this.handleClose}>Weather</MenuItem>
              </Link>
            </Menu>

            <Route exact path="/" component={Home} />
            <Route exact path="/list" component={List} />
            <Route exact path="/weather" component={Weather} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default Nav;
