
import {saga as sagaLinks}  from './../ducks/links';
import {all} from 'redux-saga/effects';

export default function * rootSaga() {
  yield all([
    sagaLinks()
  ])
}

