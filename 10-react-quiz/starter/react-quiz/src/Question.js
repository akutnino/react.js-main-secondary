export default function Question(props) {
	const { questionObject } = props;
	const { correctOption, id, options, question, points } = questionObject;
	console.log(questionObject);

	return (
		<div>
			<h4>{question}</h4>

			<div className='options'>
				{options.map((option, index) => (
					<button
						className='btn btn-option'
						key={index}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}
