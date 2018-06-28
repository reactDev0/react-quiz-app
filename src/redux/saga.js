import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import apiURL from '../server/api';

import * as CONSTANTS from './constants';
import {
  quizDataSuccess,
  quizDataError,
} from './actions';

function fetchQuiz(action) {
  return axios.get(`${apiURL}?amount=${action.amount}&difficulty=${action.difficulty}&type=${action.flag}`);
}

// makes the api call when quiz saga sees the action
export function* quizDataRequest(action) {
  try {
    const quizItems = yield call(fetchQuiz, action);

    // dispatch a success action to the store with the new quiz
    yield put(quizDataSuccess(quizItems.data.results));
  } catch(error) {
    //dispatch a failure action to the store with the error
    yield put(quizDataError(error));
  }
}

// quiz saga: watches for actions dispatched to the store, starts quizDataRequest
export default function* quizSaga() {
  yield takeLatest(CONSTANTS.QUIZ_DATA_REQUEST, quizDataRequest);
}
