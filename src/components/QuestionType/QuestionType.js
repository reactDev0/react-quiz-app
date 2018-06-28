import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionType extends Component {

  render() {
    return (
      <h2 className="questionType">{this.props.type}</h2>
    );
  }
}

QuestionType.propTypes = {
  type: PropTypes.string.isRequired
};

export default QuestionType;