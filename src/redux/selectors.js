import { createSelector } from 'reselect';

const selectQuiz = () => (state) => state.get('quizReducer');

const makeSelectQuizData = () => createSelector(
  selectQuiz(),
  (quizState) => quizState.get('quizItems'),
);

const makeSelectQuizDataLoading = () => createSelector(
  selectQuiz(),
  (quizState) => quizState.get('isLoading'),
);

const makeSelectedAnswers = () => createSelector(
  selectQuiz(),
  (quizState) => quizState.get('answers'),
);

const makeCorrectAnswersCount = () => createSelector(
  selectQuiz(),
  (quizState) => quizState.get('correctAnswersCount'),
);

export {
  selectQuiz,
  makeSelectQuizData,
  makeSelectedAnswers,
  makeCorrectAnswersCount,
  makeSelectQuizDataLoading,
};