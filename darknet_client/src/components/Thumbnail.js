import React from 'react';
import '../static/home.css'



class Thumbnail extends React.Component {


    render() {
        let list = []
        for (let i = 1; i < 20; i++) {
            list.push("http://127.0.0.1:8000/movie-image/captain-america-the-winter-soldier/1.jpg");
        }
        let newList = list.map((val, pos) => {
            console.log(val);
            return (<img key={pos} className="movie-image" src={val}></img>);
        });
        return (
            <div className="thumbnail">
                {newList}
            </div>
        );
    }
}

export default Thumbnail;
