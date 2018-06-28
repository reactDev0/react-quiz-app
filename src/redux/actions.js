import * as CONSTANTS from './constants';

export function quizDataRequest(amount = 10, difficulty='hard', flag='boolean') {
  return {
    type: CONSTANTS.QUIZ_DATA_REQUEST,
    amount,
    difficulty,
    flag,
  };
}

export function quizDataSuccess(data) {
  return {
    type: CONSTANTS.QUIZ_DATA_SUCCESS,
    data,
  };
}

export function quizDataError(error) {
  return {
    type: CONSTANTS.QUIZ_DATA_ERROR,
    error,
  };
}

export function saveAnswer(answer) {
  return {
    type: CONSTANTS.QUIZ_ANSWERS_SAVE,
    answer,
  }
}

export function saveCorrectAnswersCount(correctAnswersCount) {
  return {
    type: CONSTANTS.QUIZ_CORRECT_ANSWERS_COUNT_SAVE,
    correctAnswersCount,
  }
}