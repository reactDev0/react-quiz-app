import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import Question from '../../components/Question';
import QuestionType from '../../components/QuestionType';
import QuestionCount from '../QuestionCount';
import AnswerOption from '../AnswerOption';

function Quiz(props) {

  function renderAnswerOption(item) {
    return (
      <AnswerOption
        key={item}
        answerContent={item}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <ReactCSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>

        <div className="quiz_home__header">
          <QuestionType type={props.questionType} />
        </div>

        <div className="quiz_home__content">
          <Question content={props.question} />
          <ul className="answerOptions">
            {props.answerOptions.map(renderAnswerOption)}
          </ul>
        </div>

        <div className="quiz_home__footer">
          <QuestionCount
            counter={props.questionId}
            total={props.questionTotal}
          />
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  questionType: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
