import React from 'react';
import Logo from './Logo'
import Auth from './Auth'
import $ from 'jquery'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

class Main extends React.Component{
   
    mainLogoStyle = {
        width: '350px',
        height: '350px',
        textAlign: 'center'
    }

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to={"/home"} />
        }
        return(
            <div>
                <Logo cstyle={this.mainLogoStyle} />
                <Auth />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
