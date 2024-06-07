import StarRating from './StarRating';
import { useEffect, useState } from 'react';

const KEY = '3494c38';

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorString, setErrorString] = useState('');
	const [selectedMovieId, setSelectedMovieId] = useState(null);
	const [selectedMovieObject, setSelectedMovieObject] = useState({});

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setErrorString('');
				setIsLoading(true);

				const fetchURL = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
				const fetchOptions = {};

				const response = await fetch(fetchURL, fetchOptions);
				if (response.ok === false) throw new Error('Fetch Request Failed');

				const data = await response.json();
				if (data.Response === 'False') throw new Error('Movie Not Found');

				setMovies(data.Search);
			} catch (error) {
				console.error(error);
				setErrorString(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (query.length < 3) {
			setMovies([]);
			setErrorString('');
			return;
		}

		fetchMovies();
		return () => {};
	}, [query]);

	return (
		<>
			<NavBar>
				<SearchBar
					query={query}
					setQuery={setQuery}
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
						/>
					)}
					{!selectedMovieId && (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function NavBar(props) {
	const { children } = props;

	return (
		<nav className='nav-bar'>
			<Logo />
			{children}
		</nav>
	);
}

function Logo(props) {
	return (
		<div className='logo'>
			<span role='img'>🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function SearchBar(props) {
	const { query, setQuery } = props;

	const handleSearchInput = (event) => {
		setQuery(event.target.value);
	};

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={handleSearchInput}
		/>
	);
}

function NumberResults(props) {
	const { movies } = props;

	return (
		<p className='num-results'>
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Main(props) {
	const { children } = props;

	return <main className='main'>{children}</main>;
}

function Box(props) {
	const { children } = props;
	const [isOpen, setIsOpen] = useState(true);

	const handleToggle = () => {
		setIsOpen((currentState) => !currentState);
	};

	return (
		<div className='box'>
			<button
				className='btn-toggle'
				onClick={handleToggle}
			>
				{isOpen ? '–' : '+'}
			</button>
			{isOpen && children}
		</div>
	);
}

function Loader(props) {
	return <p className='loader'>Loading...</p>;
}

function ErrorMessage(props) {
	const { errorString } = props;

	return <p className='error'>⛔ {errorString}</p>;
}

function MovieList(props) {
	const { movies, setSelectedMovieId, setSelectedMovieObject } = props;

	const handleSelectedMovie = (movieId) => {
		return () => {
			setSelectedMovieId((currentId) => (currentId === movieId ? null : movieId));
			setSelectedMovieObject((currentObject) =>
				currentObject?.imdbID === movieId ? {} : currentObject
			);
		};
	};

	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<MovieItem
					movie={movie}
					onClick={handleSelectedMovie(movie.imdbID)}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

function MovieItem(props) {
	const { movie, onClick } = props;

	return (
		<li onClick={onClick}>
			<img
				src={movie.Poster}
				alt={`${movie.Title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function MovieDetails(props) {
	const {
		selectedMovieId,
		setSelectedMovieId,
		selectedMovieObject,
		setSelectedMovieObject
	} = props;
	const [isLoading, setIsLoading] = useState(false);

	const {
		Title: title,
		Poster: poster,
		Released: released,
		Runtime: runtime,
		Genre: genre,
		imdbRating,
		Plot: plot,
		Actors: actors,
		Director: director
	} = selectedMovieObject;

	const handleCloseMovieDetails = () => {
		setSelectedMovieId(null);
		setSelectedMovieObject({});
	};

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				setIsLoading(true);

				const fetchURL = `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`;
				const fetchOptions = {};

				const response = await fetch(fetchURL, fetchOptions);
				if (response.ok === false) throw new Error('Fetch Request Failed');

				const data = await response.json();
				if (data.Response === 'False') throw new Error('Response Data Failed');

				setSelectedMovieObject(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		if (!selectedMovieId) return;

		fetchMovieDetails();
		return () => {};
	}, [selectedMovieId, setSelectedMovieObject]);

	return (
		<div className='details'>
			{isLoading && <Loader />}
			{!isLoading && (
				<>
					<header>
						<button
							className='btn-back'
							onClick={handleCloseMovieDetails}
						>
							&larr;
						</button>
						<img
							src={poster}
							alt={`Poster of ${title}`}
						/>
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>⭐ {imdbRating} IMDb rating</p>
						</div>
					</header>

					<section>
						<div className='rating'>
							<StarRating
								maxRating={10}
								starSize={25}
							/>
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring : {actors}</p>
						<p>Directed by : {director}</p>
					</section>
				</>
			)}
		</div>
	);
}

function WatchedSummary(props) {
	const { watched } = props;
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));

	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMoviesList(props) {
	const { watched } = props;

	return (
		<ul className='list'>
			{watched.map((movie) => (
				<WatchedMovieItem
					movie={movie}
					key={movie.imdbID}
				/>
			))}
		</ul>
	);
}

function WatchedMovieItem(props) {
	const { movie } = props;

	return (
		<li>
			<img
				src={movie.Poster}
				alt={`${movie.Title} poster`}
			/>
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>
			</div>
		</li>
	);
}
