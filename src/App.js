import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import MovieList from './MovieList'
import Movie from './Movie'
import requests from './requests'
import Banner from './Banner'
import { useState } from 'react'
import SearchResult from './SearchResult'
import Login from './Login'
import { useEffect } from 'react'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'
import PostReview from './PostReview'
import ViewReview from './ViewReview'
import Favourites from './Favourites'
import WatchLater from './WatchLater'
import Playtube from './Playtube'
import News from './News'
function App() {


	const [{ basket }, dispatch] = useStateValue();

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		// will only run once when the app component loads...

		auth.onAuthStateChanged((authUser) => {
			console.log("THE USER IS >>> ", authUser);

			if (authUser) {
				// the user just logged in / the user was logged in

				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				// the user is logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<Router className="App">
			<div className="App">

				<Switch>
					<Route path="/movie/post_review/:movieId">
						<Header searchValue={searchValue} setSearchValue={setSearchValue} />
						<PostReview />
					</Route>
					<Route path="/movie/view_review/:movieId">
						<Header searchValue={searchValue} setSearchValue={setSearchValue} />
						<ViewReview />
					</Route>
					<Route path={`/movie/:movieId`}>
						<Header searchValue={searchValue} setSearchValue={setSearchValue} />
						<Movie />
					</Route>
					<Route path="/Favourites">
						<Header searchValue={searchValue} setSearchValue={setSearchValue} />
						<Favourites />
					</Route>
					<Route path="/WatchLater">
						<Header searchValue={searchValue} setSearchValue={setSearchValue} />
						<WatchLater />
					</Route>
					<Route path="/Playtube/:movieTitle">
						<Header searchValue={searchValue} setSearchValue={setSearchValue} />
						<Playtube />
					</Route>
					<Route path="/Login">
						<Login></Login>
					</Route>
					<Route path="/News/:movieTitle">
						<Header searchValue={searchValue} setSearchValue={setSearchValue} />
						<News />
					</Route>
					<Route path="/">
						<Header searchValue={searchValue} setSearchValue={setSearchValue} />
						{searchValue ?
							<SearchResult searchValue={searchValue} /> :
							<>
								<Banner />
								<MovieList title="Trending" fetchUrl={requests.fetchTrending} />
								<MovieList title="Top Rated" fetchUrl={requests.fetchTopRated} />
								<MovieList title="Action" fetchUrl={requests.fetchActionMovies} />
								<MovieList title="Comedy" fetchUrl={requests.fetchComedyMovies} />
								<MovieList title="Horror" fetchUrl={requests.fetchHorrorMovies} />
								<MovieList title="Romance" fetchUrl={requests.fetchRomanceMovies} />
								<MovieList title="Documentary" fetchUrl={requests.fetchDocumentaries} />
							</>
						}
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
