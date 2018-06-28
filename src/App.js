import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import QuizHome from './containers/QuizHome';

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/quiz" component={QuizHome} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
