import React from 'react'
import axios from 'axios'
import { useStateValue } from './StateProvider'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import instance from './axios'
import { omdb } from './axios'

function WatchLater() {
    const [watchlater, setwatchlater] = useState();
    const [{ x, user }, y] = useStateValue();
    // const [movies, setMovie] = useState([]);
    const [movies, setmovies] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4000/watchlater?username=" + user?.email)
            .then(res => {
                setwatchlater(res.data);
            })
    }, [])

    // console.log(watchlater);

    useEffect(() => {
        if (watchlater) {
            for (let fav of watchlater) {
                // console.log(fav);
                async function fetchData() {
                    let request
                    if (fav[0] === 't') {
                        request = await omdb.get(`/?i=${fav}&apikey=8cb726cc`);
                    }
                    else {
                        request = await instance.get('/movie/' + fav + '?api_key=2248ff0df2a94f4b7e522e5e43ea6abf');
                    }
                    setmovies(old => [...old, request.data]);
                    // console.log(request.data);
                }
                fetchData();
            }
        }
    }, [watchlater])


    // console.log(movies);

    // if (!user?.email) {
    //     alert("Please login first")
    //     return
    // }
    // console.log(watchlater);
    return (
        <div className="search__list">
            <div>
                {movies.map(movie => (
                    // if movie.id is undefined use movie.tmdbID
                    <Link to={`/movie/${movie.id || movie.imdbID}`}>
                        <img
                            key={movie.id}
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : `${movie.Poster}`}
                            alt={movie.original_title}
                            style={{ width: '200px', height: '300px', margin: '10px', borderRadius: '10px'}}  
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default WatchLater
