export default function Options(props) {
	const { questionObject, userAnswer, dispatch } = props;
	const { correctOption, id, options, question, points } = questionObject;
	const isAnswered = userAnswer !== null;

	const handleAnswer = (answer) => {
		return () => {
			dispatch({
				type: 'questionAnswered',
				payload: answer
			});
		};
	};

	return (
		<div className='options'>
			{options.map((option, index) => {
				const correctAnswerStyle = correctOption === index ? 'correct' : 'wrong';
				const userAnswerStyle = userAnswer === index ? 'answer' : '';
				const questionResultStyle = isAnswered ? correctAnswerStyle : '';

				return (
					<button
						className={`btn btn-option ${userAnswerStyle} ${questionResultStyle} `}
						onClick={handleAnswer(index)}
						disabled={isAnswered}
						key={option}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}
