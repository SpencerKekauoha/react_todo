import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';

// Component
import Nav from './components/nav/Nav.js';

// Styles
import './App.css';

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <div className="App">
          <Nav></Nav>
        </div>
      </CookiesProvider>
    );
  }
}

export default App;
