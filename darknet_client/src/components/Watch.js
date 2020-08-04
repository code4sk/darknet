import React from 'react';
import $ from 'jquery'



class Watch extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
    }

    homeStyle = {
        margin: '40px'
    }

    render() {
        let url = window.location.href;
        console.log(url);
        let vid = url.split('/').slice(-1)[0];
        console.log(vid);
        let mediaURL = `http://localhost:8000/movie/watch/${vid}/`
        return (
            <div style={this.homeStyle}>
                <video width="100%" controls src={mediaURL}></video>
            </div>
        );
    }

    handleLoad() {
        console.log('on load listener in home')
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/movie/get-all/",
            success: (res) => {
                console.log(res);
                
            },
            error: (e) => {
                console.log(e.statusText, "error");
            }
        })
    }

    componentDidMount() {
        // window.addEventListener('load', this.handleLoad);
        // this.handleLoad();
    }
    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
    }




}

export default Watch;
