import React from 'react';
import $ from 'jquery'
import Navbar from './Navbar'
import Thumbnail from './Thumbnail'


class Home extends React.Component{

    constructor(props) {
        super(props);
        this.handleLoad = this.handleLoad.bind(this);
    }

    state = {
        moviesList: []
    }

    homeStyle = {
        margin: '40px'
    }
    render(){
        return(
            <div style={this.homeStyle}>
                <Navbar />
                <Thumbnail moviesList={this.state.moviesList} />
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
                this.setState({
                    moviesList: res
                })
            },
            error: (e) => {
                console.log(e.statusText, "error");
            }
        })
    }

    componentDidMount() {
        // window.addEventListener('load', this.handleLoad);
        this.handleLoad();
    }
    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
    }

    

    
}

export default Home;
