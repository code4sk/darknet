import React from 'react';
import logoImg from './../image/darknet_logos/logo.png'
import '../static/Logo.css'



class Logo extends React.Component{

    nStyle = {
        ...this.props.cstyle,
        
    }

    render(){
        return(
            <div className="home-logo-box" >
                <img src={logoImg} style={this.nStyle}></img>
            </div>
        );
    }

    

}



export default Logo;
