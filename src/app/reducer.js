import {combineReducers}          from 'redux';
import {reducer as form}          from 'redux-form';
import {routerReducer as router}  from 'react-router-redux';
import links from './../ducks/links';

export default combineReducers({
  router,
  form,
  links
})