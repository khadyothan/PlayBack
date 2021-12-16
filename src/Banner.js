import React,{useState,useEffect} from 'react'
import axios from './axios'
import requests from './requests'
import "./banner.css"

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
    
    console.log(movie)

    return (
        <header
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: 'center center'
            }}
            >
            <div className='banner_contents'>
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div>
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
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

