import React from "react";

const MovieList = (props) => {
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className="movie-card" key={index}>
                    <img src={movie.Poster} alt="Movie" />
                    <div className="movie-info">
                        <h5>{movie.Title}</h5>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;
