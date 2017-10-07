import firebase from 'firebase';
import { appName } from './../app/config';
import {put, takeEvery, all, call, select} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {reset} from 'redux-form';

export const moduleName = 'links';
export const modulePrefix = `${appName}/${moduleName}`;
export const types = {
  ADD_REQUEST: `${modulePrefix}/ADD_REQUEST`,
  ADD_SUCCESS: `${modulePrefix}/ADD_SUCCESS`,
  ADD_FAIL: `${modulePrefix}/ADD_FAIL`,
  DELETE_REQUEST: `${modulePrefix}/DELETE_FAIL`,
  DELETE_SUCCESS: `${modulePrefix}/DELETE_SUCCESS`,
  DELETE_FAIL: `${modulePrefix}/DELETE_FAIL`,
  VOTE_UP: `${modulePrefix}/VOTEUP`,
  VOTE_DOWN: `${modulePrefix}/VOTEDOWN`,
  VOTE_UPDATE: `${modulePrefix}/VOTE_UPDATE`,
  LOAD_INITIAL: `${modulePrefix}/LOAD_INITIAL`
};

const initialState = {
  items: {},
  isLoading: false,
  error: ''
};

export default function links(state = initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case types.LOAD_INITIAL:
      return {
        ...state,
        items: payload.items
      };

    case types.ADD_REQUEST:
    case types.DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: ''
      };

    case types.ADD_FAIL:
    case types.DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        error
      };

    case types.ADD_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: payload.item
        },
        isLoading: false
      };

    case types.DELETE_SUCCESS:
      const items = Object.assign({}, state.items);
      delete items[payload.id];

      return {
        ...state,
        items,
        isLoading: false
      };

    case types.VOTE_UPDATE:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: payload.item
        }
      };

    default:
      return state;
  }
}

export const actions = {
  addLink: (url, name) => ({ type: types.ADD_REQUEST, url, name }),
  removeLink: (id) => ({ type: types.DELETE_REQUEST, id }),
  votesUp: (id) => ({ type: types.VOTE_UP, id}),
  votesDown: (id) => ({ type: types.VOTE_DOWN, id})
};


function * sagaAdd({url, name}) {
  const id = Date.now();
  const item = {
    url,
    name,
    votes: 0
  };
  const ref = firebase.database().ref(`links/${id}`);

  try {
    yield call([ref, 'set'], item);
    yield put({
      type: types.ADD_SUCCESS,
      payload: { id, item }
    })
  } catch (error) {
    yield put({
      type: types.ADD_FAIL,
      error
    })
  }

  yield put(reset('addLinkForm'));
  yield put(push('/'));
}

function * sagaDelete(action) {
  const {id} = action;
  const ref = firebase.database().ref(`links/${id}`);

  try {
    yield call([ref, 'set'], null);
    yield put({
      type: types.DELETE_SUCCESS,
      payload: {id}
    })

  } catch (error){
    yield put({
      type: types.DELETE_FAIL,
      error
    })
  }
}

const getItemById = (state, id) => {
  return state.links.items[id];
};

function * sagaVoteUp({ id }) {
  const ref = firebase.database().ref(`links/${id}`);
  const current = yield select(getItemById, id);
  const updated = {
    ...current,
    votes: current.votes + 1
  };

  yield call([ref, 'set'], updated);
  yield put({
    type: types.VOTE_UPDATE,
    payload: {
      id,
      item: updated
    }
  });
}

function * sagaVoteDown({ id }) {
  const ref = firebase.database().ref(`links/${ id }`);
  const current = yield select( getItemById, id);

  const updated = {
    ...current,
    votes: current.votes > 0? current.votes - 1: 0
  };

  yield ([ref, 'set'], updated);
  yield put({
    type: types.VOTE_UPDATE,
    payload: {
      id,
      item: updated
    }
  })
}

function * initialLoad(){
  const ref = firebase.database().ref(`links`);
  const snapshot = yield call([ref, 'once'], 'value');

  yield put({
    type: types.LOAD_INITIAL,
    payload: {
      items: snapshot.val()
    }
  });
}

export const saga = function *() {
  yield all([
    initialLoad(),
    takeEvery(types.ADD_REQUEST, sagaAdd),
    takeEvery(types.DELETE_REQUEST, sagaDelete),
    takeEvery(types.VOTE_UP, sagaVoteUp),
    takeEvery(types.VOTE_DOWN, sagaVoteDown)
  ])
};