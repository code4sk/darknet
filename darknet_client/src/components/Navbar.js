import React from 'react';
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Nav from './Nav'


class Navbar extends React.Component {
    
    navLogoStyle = {
        // display: 'inline',
        width: '130px',
        height: '130px'
    }

    render() {
        return (
            <div className="navbar">
                <Link to='/home'>
                    <Logo cstyle={this.navLogoStyle} />
                </Link>
                
                <Nav />
            </div>
        );
    }
}

export default Navbar;
