import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '../../utils/injectSaga';
import { quizDataRequest } from '../../redux/actions';
import saga from '../../redux/saga';
import { makeSelectQuizDataLoading } from '../../redux/selectors';

import './Home.css';

class Home extends Component {
    componentDidMount() {
        this.props.getQuizData(5, 'easy','');
    }

    render() {
        const { isLoading } = this.props;

        if(isLoading) {
            return (
                <div className="container">
                    <p>Loading ...</p>
                </div>
            );
        }

        return (
            <div className="home">
                <div className="container">
                    <div className="home__header">
                        <div className="row">
                            <h2 className="home__title">Welcome to the Trivia Challenge!</h2>
                        </div>
                    </div>
                    <div className="home__body">
                        <div className="row">
                            <p className="home__content">You will be presented with 10 True or False questions.</p>
                            <p className="home__question">Can you score 100%?</p>
                        </div>
                    </div>
                    <div className="home__footer">
                        <div className="row">
                            <Link to="/quiz" className="btn btn-default">BEGIN</Link>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectQuizDataLoading(),
});

const mapDispatchToProps = {
  getQuizData: quizDataRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'quiz', saga });

export default compose(
  withConnect,
  withSaga,
)(Home);
