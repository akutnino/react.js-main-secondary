import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

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
				<p>1/15</p>
				<p>Question</p>
			</Main>
		</div>
	);
}
