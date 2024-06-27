export default function Options(props) {
	const { questionObject } = props;
	const { correctOption, id, options, question, points } = questionObject;

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
