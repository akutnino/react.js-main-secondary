import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const SECS_PER_QUESTION = 20;

const initialState = {
	questions: [],
	questionIndex: 0,
	userAnswer: null,
	userPoints: 0,
	userHighscore: 0,
	secondsRemaining: null,
	status: 'loading'
};

const reactQuizReducer = (currentState, action) => {
	switch (action.type) {
		case 'dataReceived':
			return {
				questions: action.payload,
				questionIndex: 0,
				userAnswer: null,
				userPoints: 0,
				userHighscore: currentState.userHighscore,
				secondsRemaining: null,
				status: 'ready'
			};

		case 'dataError':
			return {
				questions: [],
				questionIndex: 0,
				userAnswer: null,
				userPoints: 0,
				userHighscore: 0,
				secondsRemaining: null,
				status: 'error'
			};

		case 'startQuiz':
			return {
				questions: currentState.questions,
				questionIndex: 0,
				userAnswer: null,
				userPoints: 0,
				userHighscore: currentState.userHighscore,
				secondsRemaining: currentState.questions.length * SECS_PER_QUESTION,
				status: 'active'
			};

		case 'questionAnswered':
			const currentQuestion = currentState.questions.at(currentState.questionIndex);
			const updatedPoints =
				action.payload === currentQuestion.correctOption
					? currentState.userPoints + currentQuestion.points
					: currentState.userPoints;

			return {
				questions: currentState.questions,
				questionIndex: currentState.questionIndex,
				userAnswer: action.payload,
				userPoints: updatedPoints,
				userHighscore: currentState.userHighscore,
				secondsRemaining: currentState.secondsRemaining,
				status: 'active'
			};

		case 'nextQuestion':
			return {
				questions: currentState.questions,
				questionIndex: currentState.questionIndex++,
				userAnswer: null,
				userPoints: currentState.userPoints,
				userHighscore: currentState.userHighscore,
				secondsRemaining: currentState.secondsRemaining,
				status: 'active'
			};

		case 'endQuiz':
			const newUserHighscore =
				currentState.userPoints > currentState.userHighscore
					? currentState.userPoints
					: currentState.userHighscore;

			return {
				questions: currentState.questions,
				questionIndex: 0,
				userAnswer: null,
				userPoints: currentState.userPoints,
				userHighscore: newUserHighscore,
				secondsRemaining: null,
				status: 'finish'
			};

		case 'restartQuiz':
			return {
				questions: currentState.questions,
				questionIndex: 0,
				userAnswer: null,
				userPoints: 0,
				userHighscore: currentState.userHighscore,
				secondsRemaining: null,
				status: 'ready'
			};

		case 'updateRemainingTime':
			return {
				questions: currentState.questions,
				questionIndex: currentState.questionIndex,
				userAnswer: currentState.userAnswer,
				userPoints: currentState.userPoints,
				userHighscore: currentState.userHighscore,
				secondsRemaining: currentState.secondsRemaining - 1,
				status: currentState.status
			};

		default:
			return currentState;
	}
};

export default function App(props) {
	const [state, dispatch] = useReducer(reactQuizReducer, initialState);
	const {
		questions,
		questionIndex,
		userAnswer,
		userPoints,
		userHighscore,
		secondsRemaining,
		status
	} = state;
	const totalMaxPoints = questions.reduce((acc, curr) => curr.points + acc, 0);
	const totalQuestions = questions.length;
	const isAnswered = userAnswer !== null;

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const fetchURL = 'http://localhost:8000/questions';
				const fetchOptions = {};

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('FETCH REQUEST FAILED');

				const data = await response.json();
				dispatch({
					type: 'dataReceived',
					payload: data
				});
			} catch (error) {
				dispatch({ type: 'dataError' });
				console.error(error);
			}
		};

		fetchQuestions();
		return () => {};
	}, []);

	return (
		<div className='app'>
			<Header />

			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen
						totalQuestions={totalQuestions}
						dispatch={dispatch}
					/>
				)}
				{status === 'active' && (
					<>
						<ProgressBar
							questionIndex={questionIndex}
							totalQuestions={totalQuestions}
							userPoints={userPoints}
							totalMaxPoints={totalMaxPoints}
							isAnswered={isAnswered}
						/>

						<Question
							questionObject={questions[questionIndex]}
							userAnswer={userAnswer}
							dispatch={dispatch}
						/>

						<Footer>
							<Timer
								secondsRemaining={secondsRemaining}
								dispatch={dispatch}
							/>

							{isAnswered && (
								<NextButton
									totalQuestions={totalQuestions}
									questionIndex={questionIndex}
									dispatch={dispatch}
								/>
							)}
						</Footer>
					</>
				)}
				{status === 'finish' && (
					<FinishScreen
						userPoints={userPoints}
						totalMaxPoints={totalMaxPoints}
						userHighscore={userHighscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
