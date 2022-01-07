import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios2 from './axios'
import { Link } from 'react-router-dom';
import "./Movie.css"
import { useStateValue } from './StateProvider';
import axios from 'axios';

export default function Movie() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState([]);
  const [{ x, user }, y] = useStateValue();
  const [fav, setFav] = useState([]);
  const [flag, setFlag] = useState(false);
  const [watchlater, setwatchlater] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const request = await axios2.get('/movie/' + movieId + '?api_key=2248ff0df2a94f4b7e522e5e43ea6abf');
      setMovie(request.data);
    }
    fetchData();
  }, [movieId])

  // console.log(fav, "fav",flag,movieId);

  useEffect(() => {
    // console.log(`/favourites/${movieId}?username=${user?.email}`);
    axios.get(`http://localhost:4000/favourites/${movieId}?username=${user?.email}`).then(res => {
      setFav(res.data);
      // console.log(res.data);
    })
  }, [flag]);

  useEffect(() => {
    // console.log(`/favourites/${movieId}?username=${user?.email}`);
    axios.get(`http://localhost:4000/watchlater/${movieId}?username=${user?.email}`).then(res => {
      setwatchlater(res.data);
      // console.log(res.data);
    })
  }, [flag]);

  function addFav(e) {
    e.preventDefault();
    if (!user?.email) {
      alert("Please login first")
      return
    }
    // console.log(user.email)
    axios.post('http://localhost:4000/favourites/' + movieId, {
      username: user.email
    })
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFlag(!flag);
  }

  function remFav(e) {
    e.preventDefault();
    if (!user?.email) {
      alert("Please login first")
      return
    }
    // console.log(user.email)
    axios.delete('http://localhost:4000/favourites/' + movieId + '?username=' + user?.email)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFlag(!flag);
  }
  function addWat(e) {
    e.preventDefault();
    if (!user?.email) {
      alert("Please login first")
      return
    }
    // console.log(user.email)
    axios.post('http://localhost:4000/watchlater/' + movieId, {
      username: user.email
    })
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFlag(!flag);
  }

  function remWat(e) {
    e.preventDefault();
    if (!user?.email) {
      alert("Please login first")
      return
    }
    // console.log(user.email)
    axios.delete('http://localhost:4000/watchlater/' + movieId + '?username=' + user?.email)
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFlag(!flag);
  }
  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` || `https://image.tmdb.org/t/p/w200${movie?.poster_path}`,
          backgroundPosition: 'top center'
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
      <div className="Comments">
        <Link to={`/movie/view_review/${movie.id}`} className='comment__button'><h2>View Reviews</h2></Link>
        <Link to={`/movie/post_review/${movie.id}`} className='comment__button'><h2>Post a Review</h2></Link>
        {fav.length ? <button onClick={remFav} className='comment__button'>Remove from Favourites</button> :
          <button onClick={addFav} className='comment__button'>Add to Favourites</button>}
        {watchlater.length ? <button onClick={remWat} className='comment__button'>Remove from WatchLater</button> :
          <button onClick={addWat} className='comment__button'>WatchLater</button>}
      </div>
    </div>
  )
}