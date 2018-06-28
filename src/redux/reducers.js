import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const initalState = fromJS({
  quizItems: null,
  isLoading: true,
  error: null,
  answers: [],
  correctAnswersCount: 0,
});

function quizReducer(state = initalState, action) {
  switch(action.type) {
    case CONSTANTS.QUIZ_DATA_REQUEST:
      return state.setIn(['isLoading'], true);
    case CONSTANTS.QUIZ_DATA_SUCCESS:
      return state.setIn(['quizItems'], fromJS(action.data))
        .setIn(['isLoading'], false)
        .setIn(['correctAnswersCount'], 0)
        .setIn(['answers'], []);
    case CONSTANTS.QUIZ_DATA_ERROR:
      return state.setIn(['error'], fromJS(action.error))
        .setIn(['isLoading'], false);
    case CONSTANTS.QUIZ_ANSWERS_SAVE:
      return state.setIn(['answers'], [...state.get('answers'), fromJS(action.answer)]);
    case CONSTANTS.QUIZ_CORRECT_ANSWERS_COUNT_SAVE:
      return state.setIn(['correctAnswersCount'], state.get('correctAnswersCount') + fromJS(action.correctAnswersCount));
    default:
  }

  return state;
}

export default quizReducer;