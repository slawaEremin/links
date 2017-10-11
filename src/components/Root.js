import React                from 'react';
import Navigation           from './common/Navigation';
import MainPage             from './pages/MainPage';
import AddPage              from './pages/AddPage';
import {Route}              from 'react-router-dom';

const Root = () => (
  <div className="container">
    <Navigation />

    <Route path="/" exact component={MainPage}/>
    <Route path="/new" component={AddPage}/>
  </div>
);

export default Root;