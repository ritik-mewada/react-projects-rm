import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";

const App = () => {
    const [movies, setMovies] = useState([
        {
            Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
            Title: "The Avengers",
        },
        {
            Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
            Title: "Iron Man",
        },
        {
            Poster: "https://m.media-amazon.com/images/M/MV5BMjk1NzcwMDUtNDU4ZC00MzlhLTkzZjAtM2MxMTRjZGE0ODdhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
            Title: "Shershaah",
        },
        {
            Poster: "https://m.media-amazon.com/images/M/MV5BNDlmNjYzNTEtYTkxMC00MWU5LWI0MTQtZGE5MDNmYTRkNWFlXkEyXkFqcGdeQXVyNzIyNzI2NDg@._V1_SX300.jpg",
            Title: "Dr Strange",
        },
    ]);
    const [searchValue, setSearchValue] = useState("");

    const getMoviesRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=c535a9e4`;

        const response = await fetch(url);
        const responseJSON = await response.json();

        console.log(responseJSON);
        if (responseJSON.Search) {
            setMovies(responseJSON.Search);
        }
    };

    useEffect(() => {
        getMoviesRequest(searchValue);
    }, [searchValue]);

    return (
        <div className="container-fluid">
            <div className="container-h row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Movies Searching App" />
                <SearchBox
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </div>
            <div className="movie-container">
                <MovieList movies={movies} />
            </div>
        </div>
    );
};

export default App;
