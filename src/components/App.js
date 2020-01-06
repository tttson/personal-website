import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
// import Menu from './Menu';
import Landing from './Landing';
// import Employee from './Employee';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <p>HI T :)</p>
          <Route path="/" component={Landing} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
