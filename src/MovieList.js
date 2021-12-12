import Search from '@mui/icons-material/Search';
import React from 'react'
import {useState,useEffect} from 'react'
import axios from './axios';
import "./MovieList.css";

function MovieList({title,fetchUrl}) {
    const [movies,setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl])

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img className="row__poster"
                        key={movie.id}
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.original_title}
                    />
                ))}
            </div>
        </div>
    )
}

export default MovieList
