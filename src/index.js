import React              from 'react';
import ReactDOM           from 'react-dom';
import Root               from './components/Root';
import './app/firebase';
import store              from './app';
import {Provider}         from 'react-redux';
import {ConnectedRouter}  from 'react-router-redux';
import  history           from './app/history';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
