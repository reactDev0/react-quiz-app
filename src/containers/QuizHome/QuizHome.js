import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Quiz from '../../components/Quiz';
import Result from '../Result';
import { saveAnswer } from '../../redux/actions';
import { makeSelectQuizData } from '../../redux/selectors';

class QuizHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questionId: 1,
            question: '',
            questionType: '',
            answerOptions: [],
            answer: '',           
            isFinished: false,
        };
    }

    componentWillMount = () => {
        const { quizItems } = this.props;
        if(quizItems === null) return (<Redirect to="/" />);
        const allAnswerOptions = quizItems.map((question) => this.shuffleArray([question.get('correct_answer'), ...question.get('incorrect_answers')]));
        this.setState({
            question: quizItems.get(0).get('question'),
            questionType: quizItems.get(0).get('category'),
            answerOptions: allAnswerOptions.get(0)
        });
    };

    shuffleArray = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    handleAnswerSelected = (event) => {
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.questionId < this.props.quizItems.size) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(), 300);
        }
    }

    setUserAnswer = (answer) => {
        const { saveAnswer } = this.props;
        this.setState({ answer: answer });
        saveAnswer(answer);
    }

    setNextQuestion = () => {
        const { quizItems } = this.props;
        const questionId = this.state.questionId + 1;

        this.setState({
            questionId: questionId,
            question: quizItems.get(questionId - 1).get('question'),
            questionType: quizItems.get(questionId - 1).get('category'),
            answerOptions: this.shuffleArray([quizItems.get(questionId - 1).get('correct_answer'), ...quizItems.get(questionId - 1).get('incorrect_answers')]),
            answer: ''
        });
    }

    setResults = () => {
        this.setState({ isFinished: true });
    }

    renderQuiz = () => {
        const { quizItems } = this.props;
        const { answer, answerOptions, questionType, questionId, question } = this.state;

        return (
            <Quiz
                answer={answer}
                answerOptions={answerOptions}
                questionId={questionId}
                questionType={questionType}
                question={question}
                questionTotal={quizItems.size}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }

    renderResult = () => {
        const { quizItems } = this.props;

        return (
            <Result questionTotal={quizItems.size}/>
        );
    }

    render() {
        const { quizItems } = this.props;
        if(quizItems === null) return (<Redirect to="/" />);
        return (
            <div className="quiz_home">
                {this.state.isFinished ? this.renderResult() : this.renderQuiz()}
            </div>
        );
    }
}

QuizHome.propTypes = {
    quizItems: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    quizItems: makeSelectQuizData(),
});

const mapDispatchToProps = {
    saveAnswer,
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(QuizHome);