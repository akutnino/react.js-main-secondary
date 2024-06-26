export default function Options(props) {
	const { options } = props;

	return (
		<div className='options'>
			{options.map((option) => (
				<button
					className='btn btn-option'
					key={option}
				>
					{option}
				</button>
			))}
		</div>
	);
}
