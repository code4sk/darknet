import React from 'react';
import '../static/home.css'

import { NavLink } from 'react-router-dom'



class Thumbnail extends React.Component {
 

    onClickListener = () => {
        this.props.history.push(`/watch?v=3`);
    }

    render() {
        let list = this.props.moviesList;
        let urlList = list.map((el) => {
            return (`http://127.0.0.1:8000/movie-image/${el}/1.jpg`);
        });
        let newList = urlList.map((val, pos) => {
            console.log(val);
            let link = `/watch/${list[pos]}`;
            console.log(link);
            return (<NavLink to={link} key={pos}><img  className="movie-image" src={val}></img></NavLink>);
        });
        return (
            <div className="thumbnail">
                {newList}
            </div>
        );
    }
}

export default Thumbnail;
