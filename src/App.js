import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './Header'
import MovieList from './MovieList'
import requests from './requests'
import Banner from './Banner'	
import {useState} from 'react'
import SearchResult from './SearchResult'

function App() {
    const [searchValue, setSearchValue] = useState('');
	return (
		<Router className="App">
			<div className="App">	
				<Header searchValue={searchValue} setSearchValue={setSearchValue}/>
				<Switch>
					<Route path = "/Favourites">
						<h1>Your Favourites</h1>
					</Route>
					<Route path = "/Login">
						<h1>Login</h1>
					</Route>
					<Route path = "/">	
						{searchValue ? 
							<SearchResult searchValue = {searchValue}/> :
							<>
								<Banner />
								<MovieList title="Trending" fetchUrl={ requests.fetchTrending } />
								<MovieList title="Top Rated" fetchUrl={ requests.fetchTopRated } />
								<MovieList title="Action" fetchUrl={ requests.fetchActionMovies } />
								<MovieList title="Comedy" fetchUrl={ requests.fetchComedyMovies } />
								<MovieList title="Horror" fetchUrl={ requests.fetchHorrorMovies } />
								<MovieList title="Romance" fetchUrl={ requests.fetchRomanceMovies } />
								<MovieList title="Documentary" fetchUrl={ requests.fetchDocumentaries } />
							</> 
						}
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App
