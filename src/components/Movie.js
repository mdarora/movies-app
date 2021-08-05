import React from 'react';

const Movie = (props) => {
    return (
    <>
        <div title={props.title} className="movie" onClick={() => props.changeMovieId(props.id)}>
            <div className="movie-poster">
                {props.poster === "N/A" ? <img src={props.poster} alt="Movie poster" className="no-poster"/> : <img src={props.poster} alt="poster" />}
            </div>
            <div className="movie-details">
                <h4 className="movie-title">{props.title}</h4>
                <div className="movie-year-type">
                    <p className="movie-year">
                        Year : {props.year}
                    </p>
                    <p className="movie-type">
                        Type : {props.type}
                    </p>
                </div>
            </div>
        </div>
    </>
    )
}

export default Movie
