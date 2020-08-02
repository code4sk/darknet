import React from 'react';
import Main from './components/Main'
import SignUpForm from './components/SignUpForm'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import { connect } from 'react-redux'
import $ from 'jquery'

import './App.css';
import LoginForm from './components/LoginForm';

class App extends React.Component{

  onLoadListener = async () => {
    console.log('on load listener')
    if (!this.props.isLoggedIn && localStorage.getItem('dToken')) {
      const token = localStorage.getItem('dToken');
      $.ajax({
        type: "POST",
        url: 'http://localhost:8000/user/check-token/',
        crossDomain: true,

        data: JSON.stringify({
          token: token
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        success: (data) => {
          console.log("complete", data);
          this.props.change(data.email, data.token);
          console.log(this.props.isLoggedIn);
        },
        error: function (e) {
          console.log('token in localStorage is invalid', e);
        }
      })
    }
  }

  componentWillMount() {
    window.addEventListener('load', this.onLoadListener);
  }

  render() {
    return (
        <div className="App">
        <Router >
          <Switch>
            <Route path={"/"} exact component={Main} />
            <Route path={"/home"} component={Home} />
            <Route path={"/user/login"} exact component={LoginForm} />
            <Route path={"/user/sign-up"} exact component={SignUpForm} />

          </Switch>

        </Router>
        </div>
    );
  }

  

}

let mapDispatchToProps = (dispatch) => {
  return ({
    change: (email, token) => {
      return dispatch({ type: "CHANGE", email: email, token: token });
    }
  })
}

let mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
