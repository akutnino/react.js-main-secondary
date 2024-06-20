import WatchedMovieItem from './WatchedMovieItem';

export default function WatchedMoviesList(props) {
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
