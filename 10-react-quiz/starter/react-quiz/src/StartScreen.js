export default function StartScreen(props) {
	const { totalQuestions } = props;

	return (
		<div className='start'>
			<h2>Welcome to the React Quiz!</h2>
			<h3>{totalQuestions} questions to test your React mastery</h3>
			<button
				type='button'
				className='btn btn-ui'
			>
				Let' Start
			</button>
		</div>
	);
}
