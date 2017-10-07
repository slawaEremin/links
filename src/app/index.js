import {createStore, applyMiddleware} from 'redux';
import logger               from 'redux-logger';
import {routerMiddleware}   from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import history              from './history';
import reducer              from './reducer';
import rootSaga             from './sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(logger,sagaMiddleware, routerMiddleware(history));
const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;