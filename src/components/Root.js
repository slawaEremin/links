import React                from 'react';
import Navigation           from './common/Navigation';
import MainPage             from './pages/MainPage';
import AddPage              from './pages/AddPage';
import {Route}              from 'react-router-dom';

const Root = () => (
  <div className="app">
    <div className="header">
      <div className="center">
        <Navigation />
      </div>
    </div>

    <div className="center">
      <Route path="/" exact component={MainPage}/>
      <Route path="/new" component={AddPage}/>
    </div>
  </div>
);

export default Root;