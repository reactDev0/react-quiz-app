import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResultForm from '../../components/ResultForm';
import { makeSelectQuizData, makeCorrectAnswersCount } from '../../redux/selectors';

class Result extends Component {

  render() {
    const { quizItems, correctAnswersCount } = this.props;

    return (
      <div className="container">
        <h2 className="quizResult_title">
          You scored
          <div>
            <span>{correctAnswersCount}</span> of <span>{quizItems.size}</span>
          </div>
        </h2>
        <div className="quizResult_content">
          {quizItems.map((quizItem, index) => (
            <ResultForm key={`item-${quizItem.get('question')}`} quizItem={quizItem} selectIndex={index} />
          ))}
        </div>
        <div className="quizResult__footer">
          <div className="row">
            <Link to="/" className="btn btn-default">PLAY AGAIN?</Link>
          </div>
        </div>        
      </div>
    );
  }  
}

Result.propTypes = {
  quizItems: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  quizItems: makeSelectQuizData(),
  correctAnswersCount: makeCorrectAnswersCount(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Result);
