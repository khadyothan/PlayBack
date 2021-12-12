import React from 'react'
import "./MovieList.css";
import { useState,useEffect } from 'react';

function SearchResult({searchValue}) {
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
        <div className="row">
            <div className="row__posters">
                {movies.map(movie => (
                    <>
                        {movie.Poster!="N/A"? 
                            <img className="row__poster"
                                src={movie.Poster}
                            /> : 
                        null}
                    </>
                ))}
            </div>
        </div>
    )
}

export default SearchResult
