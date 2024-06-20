import { useEffect, useRef, useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import NumberResults from './NumberResults';
import Main from './Main';
import Box from './Box';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import WatchedSummary from './WatchedSummary';

export default function App() {
	const [query, setQuery] = useState('');
	const [selectedMovieId, setSelectedMovieId] = useState(null);
	const [selectedMovieObject, setSelectedMovieObject] = useState({});
	const [userRating, setUserRating] = useState(0);
	const [movies, isLoading, errorString] = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], 'watchedMoviesArray');

	useEffect(() => {
		if (selectedMovieObject.Title) {
			document.querySelector('title').textContent = `Movie: ${selectedMovieObject.Title}`;
		}

		return () => {
			document.querySelector('title').textContent = `usePopcorn | Welcome`;
		};
	}, [selectedMovieObject]);

	return (
		<>
			<NavBar>
				<SearchBar
					query={query}
					setQuery={setQuery}
					setSelectedMovieId={setSelectedMovieId}
					setSelectedMovieObject={setSelectedMovieObject}
				/>
				<NumberResults movies={movies} />
			</NavBar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !errorString && (
						<MovieList
							movies={movies}
							setSelectedMovieId={setSelectedMovieId}
							setSelectedMovieObject={setSelectedMovieObject}
							setUserRating={setUserRating}
						/>
					)}
					{errorString && <ErrorMessage errorString={errorString} />}
				</Box>
				<Box>
					{selectedMovieId && (
						<MovieDetails
							selectedMovieId={selectedMovieId}
							setSelectedMovieId={setSelectedMovieId}
							selectedMovieObject={selectedMovieObject}
							setSelectedMovieObject={setSelectedMovieObject}
							watched={watched}
							setWatched={setWatched}
							userRating={userRating}
							setUserRating={setUserRating}
						/>
					)}
					{!selectedMovieId && (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList
								watched={watched}
								setWatched={setWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function WatchedMoviesList(props) {
	const { watched, setWatched } = props;

	const handleDeleteMovie = (movieId) => {
		return () => {
			setWatched((currentWatchedMovies) => {
				const updatedWatchedMovies = currentWatchedMovies.filter((movieObject) =>
					movieObject.imdbID === movieId ? false : true
				);

				const updatedWatchedMoviesLS = JSON.stringify(updatedWatchedMovies);
				localStorage.setItem('watchedMoviesArray', updatedWatchedMoviesLS);

				return updatedWatchedMovies;
			});
		};
	};

	return (
		<ul className='list'>
			{watched.map((movieObject) => (
				<WatchedMovieItem
					movieObject={movieObject}
					onClick={handleDeleteMovie(movieObject.imdbID)}
					key={movieObject.imdbID}
				/>
			))}
		</ul>
	);
}

function WatchedMovieItem(props) {
	const { movieObject, onClick } = props;

	return (
		<li>
			<img
				src={movieObject.poster}
				alt={`${movieObject.title} poster`}
			/>
			<h3>{movieObject.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movieObject.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movieObject.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movieObject.runtime} min</span>
				</p>

				<button
					className='btn-delete'
					onClick={onClick}
				>
					X
				</button>
			</div>
		</li>
	);
}
