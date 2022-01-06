import React from 'react'
import axios from 'axios'
import { useStateValue } from './StateProvider'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import instance from './axios'

function Favourites() {
    const [favourites, setFavourite] = useState();
    const [{ x, user }, y] = useStateValue();
    const [movies, setMovie] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/favourites?username=" + user?.email).then(res => {
            setFavourite(res.data);
        })
    }, [])
    // useEffect(() => {
    //     favourites.map(fav => {
    //         const request = instance.get('/movie/' + fav.movieId + '?api_key=2248ff0df2a94f4b7e522e5e43ea6abf');
    //         setMovie(...movies, request.data);
    //     })
    // }, [favourites])
    
    // iterate through favourites and get movie details
    useEffect(() => {
        if(favourites)
        favourites.map(fav => {
            const request = instance.get('/movie/' + fav.movieId + '?api_key=2248ff0df2a94f4b7e522e5e43ea6abf');
            setMovie(...movies, request.data);
        })
    }, [favourites])

    console.log(movies);


    if (!user?.email) {
        alert("Please login first")
        return
    }
    console.log(favourites);
    return (
        <div className="search__list">
            <div className="row__posters">
                {/* {movies.map(movie => (
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
                ))} */}
            </div>
        </div>
    )
}

export default Favourites
