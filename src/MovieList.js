import React from 'react'
import { useState, useEffect } from 'react'
import axios from './axios';
import "./MovieList.css";
import { bad_words } from './filter';
import { Link } from 'react-router-dom';

function MovieList({ title, fetchUrl }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results)
            setMovies((request.data.results).filter(movie => {
                for (let word of bad_words) {
                    if (movie.title?.toLowerCase().includes(word) || movie.original_title?.toLowerCase().includes(word)) return false;
                }
                return true
            }));
            return request;
        }
        fetchData();
    }, [fetchUrl])

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <Link to={`/movie/${movie.id}`} className='row__poster'>
                        <img
                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.original_title}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MovieList
