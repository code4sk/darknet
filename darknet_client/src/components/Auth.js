import React from 'react';
import {Link} from 'react-router-dom'
import '../static/Auth.css'

class Auth extends React.Component{


    render(){
        return(
            <div className="auth">
                <span>
                    <Link to="/user/login">
                            Login
                        
                    </Link>

                    &nbsp; to enjoy unlimited movies and TV shows and more.
                </span>
                <br></br>
                <span>New User?&nbsp; <Link to="/user/sign-up">Sign-up</Link></span>
            </div>
        );
    }
}

export default Auth;
