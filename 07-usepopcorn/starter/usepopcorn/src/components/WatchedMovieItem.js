export default function WatchedMovieItem(props) {
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
