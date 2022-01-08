import React from 'react'
import "./SearchResult.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SearchResult({ searchValue }) {
    const [movies, setMovies] = useState([]);
    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8cb726cc`;
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    };

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue]);

    

    console.log(movies);
    return (
        <div className="search__list">
            <div className="row__posters">
                {movies.map(movie => (
                    <>
                        {movie.Poster !== "N/A" ?
                            <Link to={`/movie/${movie.imdbID}`} className='row__poster'>
                                <img className="row__poster"
                                    src={movie.Poster}
                                />
                            </Link>
                            :
                            null}
                    </>
                ))}
            </div>
        </div>
    )
}

export default SearchResult
