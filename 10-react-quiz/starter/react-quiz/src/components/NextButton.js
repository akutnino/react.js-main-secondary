export default function NextButton(props) {
	const { dispatch } = props;

	const handleNextQuestion = () => {
		dispatch({ type: 'nextQuestion' });
	};

	return (
		<button
			type='button'
			className='btn btn-ui'
			onClick={handleNextQuestion}
		>
			Next
		</button>
	);
}
