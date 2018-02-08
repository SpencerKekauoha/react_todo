import React from 'react';
import Hamburger from '../hamburger/Hamburger.js';
import Grid from 'material-ui/Grid';
import './Nav.css';

function Nav() {
  return (
    <div className="nav">
      <Grid container spacing={8} alignItems='center' justify='space-between'>
        <Grid item xs={2}>
          <Hamburger></Hamburger>
        </Grid>
        <Grid item xs={6}>
          <h1>All Tasks</h1>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  )
}

export default Nav;
