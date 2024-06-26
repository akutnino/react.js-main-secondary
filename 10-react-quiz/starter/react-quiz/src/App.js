import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';

const initialState = {
	questions: [],
	status: 'loading'
};

const reactQuizReducer = (currentState, action) => {
	switch (action.type) {
		case 'dataReceived':
			return {
				questions: action.payload,
				status: 'ready'
			};

		case 'dataError':
			return {
				...currentState,
				status: 'error'
			};

		default:
			return currentState;
	}
};

export default function App(props) {
	const [state, dispatch] = useReducer(reactQuizReducer, initialState);
	const { questions, status } = state;

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

			<Main className='main'>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready'}
			</Main>
		</div>
	);
}
