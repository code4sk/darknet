import React from 'react';
import loutImage from '../image/l.png'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import '../static/navbar.css'
import {connect} from 'react-redux'
import profileImage from '../image/userP.png'





class Nav extends React.Component {

    logoutListener = (e) => {
        e.preventDefault();
        
        localStorage.removeItem('dToken');
        this.props.logoutFun();
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to='/'></Redirect>
        }
        return (
            <div className="nav">
                <Link to="" className="nav-item" onClick={this.logoutListener}>
                    <img className="nav-item-image" src={loutImage}></img>
                    <span>logout</span>
                </Link>
                <Link to="" className="nav-item" >
                    <img className="nav-item-image" src={profileImage}></img>
                    <span>user</span>
                </Link>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return ({
        logoutFun: () => {
            return dispatch({ type: "LOGOUT" });
        }
    })
}

let mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
