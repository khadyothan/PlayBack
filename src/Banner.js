import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests'
import "./banner.css"
import { Link } from 'react-router-dom'

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending)
            // console.log(request)
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)])
            return request
        }
        fetchData()
    }, [])

    // console.log(movie)

    return (
        <header
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: 'auto'
            }}
        >
            <div className='banner_contents'>
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div>
                    {movie?.title ?
                        <Link to={`/Playtube/${movie.title}`} >
                            <button className='banner_button'>Play</button>
                        </Link>
                        :
                        movie?.name ?
                            <Link to={`/Playtube/${movie.name}`} >
                                <button className='banner_button'>Play</button>
                            </Link>
                            :
                            movie?.original_name ?
                                <Link to={`/Playtube/${movie.original_name}`} >
                                    <button className='banner_button'>Play</button>
                                </Link>
                                :
                                <button className='banner_button'>Play</button>
                    }
                    {movie?.title ?
                        <Link to={`/News/${movie.title}`} >
                            <button className='banner_button'>News</button>
                        </Link>
                        :
                        movie?.name ?
                            <Link to={`/News/${movie.name}`} >
                                <button className='banner_button'>News</button>
                            </Link>
                            :
                            movie?.original_name ?
                                <Link to={`/News/${movie.original_name}`} >
                                    <button className='banner_button'>News</button>
                                </Link>
                                :
                                <button className='banner_button'>News</button>
                    }
                </div>
                <p className='banner_desc'>
                    {movie?.overview}
                </p>
            </div>

            <div className='banner_fadebottom'></div>
        </header>
    )
}

export default Banner;

