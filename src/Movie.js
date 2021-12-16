import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from './axios'
import { Link } from 'react-router-dom'; 
import "./Movie.css"

export default function Movie() {
  const {movieId} = useParams()
  const [movie,setMovie] = useState([]);
  useEffect(() => {
      async function fetchData() {
        const request = await axios.get('/movie/' + movieId + '?api_key=2248ff0df2a94f4b7e522e5e43ea6abf');
        setMovie(request.data);
    }
    fetchData();
  }, [movieId])
  console.log(movie)
  return (
    <div>
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
    <div className="Comments">
      <Link to={`/movie/view_review/${movie.id}`} className='comment__button'><h2>View Reviews</h2></Link>
      <Link to={`/movie/post_review/${movie.id}`} className='comment__button'><h2>Post a Review</h2></Link>
    </div>
    </div>
  )
}