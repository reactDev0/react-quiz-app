import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionCount extends Component {

  render() {
    const { counter, total } = this.props;

    return (
      <div className="questionCount">
        <span>{counter}</span> of <span>{total}</span>
      </div>
    );
  }
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
