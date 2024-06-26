import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
	questions: [],
	questionIndex: 0,
	status: 'loading'
};

const reactQuizReducer = (currentState, action) => {
	switch (action.type) {
		case 'dataReceived':
			return {
				questions: action.payload,
				questionIndex: 0,
				status: 'ready'
			};

		case 'dataError':
			return {
				questions: [],
				questionIndex: 0,
				status: 'error'
			};

		case 'startQuiz':
			return {
				questions: currentState.questions,
				questionIndex: 0,
				status: 'active'
			};

		default:
			return currentState;
	}
};

export default function App(props) {
	const [state, dispatch] = useReducer(reactQuizReducer, initialState);
	const { questions, status, questionIndex } = state;
	const totalQuestions = questions.length;

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
				{status === 'active' && <Question questionObject={questions[questionIndex]} />}
			</Main>
		</div>
	);
}
