import React from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'



let cookie = new Cookies();

class LoginForm extends React.Component{

    onSubmitListener = (e) => {
        e.preventDefault();
        console.log('sent');
        // console.log(e.target.elements);
        let email = $('#email').val();
        let password = $('#password').val();
        console.log(email, password);
        
        cookie.set('name', 'sk', { path: "/" });
        console.log(cookie.get('name'));
        $.ajax({
            // method: "POST",
            type: "POST", 
            url: 'http://localhost:8000/user/login/',
            crossDomain: true,
            
            data: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8000',
                // 'Access-Control-Request-Headers': '*',
                // 'Access-Control-Allow-Headers':'*' , 
                // 'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'application/json',
            },
            // dataType: 'json', 
            success: (data) => {
                console.log("complete", data);
                this.props.change(email, data.token);
                localStorage.setItem('dToken', data.token);
                console.log(this.props.isLoggedIn);
            },
            error: function (e) {
                console.log('something went wrong', e);
            }
        })
    }

    render() {
        console.log('render', this.props.isLoggedIn);
        if (this.props.isLoggedIn) {
           return  <Redirect to={"/home"}/>
        }
        return (
            <div>
                <span className="loginHead">Login </span>
            <div className="form-box">
                
                    <form action="127.0.0.1/user/login" className="form" method="POST" onSubmit={this.onSubmitListener}>
                        <div className="form-group">
                            <input name="email" type="email" placeholder="Email" id="email" required className="form-input lib-login-username" autoComplete="on" />
                            <label htmlFor="email" className="label">Email</label>
                        </div>
                        <div className="form-group last-form-popup">
                            <input name="password" type="password" placeholder="Password" id="password" required className="form-input" autoComplete="on" />
                            <label htmlFor="password" className="label">Password</label>
                        </div>
                        <div className="btn-box">
                            <button className="btn-fire" id="btn5">Login &rarr;</button>
                        </div>
                    </form>
                </div>
                <span className="alt_link">New User?&nbsp; <Link to="/user/sign-up">Sign-up</Link></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
