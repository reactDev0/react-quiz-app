import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveCorrectAnswersCount } from '../../redux/actions';
import { makeSelectedAnswers } from '../../redux/selectors';

class ResultForm extends Component {

  render() {
    const { quizItem, selectIndex, selectedAnswers, getSelectedCount } = this.props;
    const correctAnswer = quizItem.get('correct_answer');
    const selectedAnswer = selectedAnswers[selectIndex];

    if (correctAnswer === selectedAnswer) {
      getSelectedCount(1);
      return (
        <div className="quizResult_item answer_true">
          <span className="icon-item">
            <div className="icon-check">              
            </div>
          </span>
          <p className="quizResult_question" dangerouslySetInnerHTML={{__html: quizItem.get('question')}}></p>
        </div>
      );
    } else {
      return (
        <div className="quizResult_item answer_false">
          <span className="icon-item"><div className="icon-times"></div></span>
          <p className="quizResult_question" dangerouslySetInnerHTML={{__html: quizItem.get('question')}}></p>
        </div>
      );      
    }
  }
}

ResultForm.propTypes = {
  quizItem: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedAnswers: makeSelectedAnswers(),
});

const mapDispatchToProps = {
  getSelectedCount: saveCorrectAnswersCount,
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ResultForm);
