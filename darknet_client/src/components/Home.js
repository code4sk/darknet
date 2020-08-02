import React from 'react';

import Navbar from './Navbar'
import Thumbnail from './Thumbnail'


class Home extends React.Component{

    homeStyle = {
        margin: '40px'
    }
    render(){
        return(
            <div style={this.homeStyle}>
                <Navbar />
                <Thumbnail />
            </div>
        );
    }
}

export default Home;
