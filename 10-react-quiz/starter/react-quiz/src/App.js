import { useEffect } from 'react';
import Header from './Header';
import Main from './Main';

export default function App(props) {
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const fetchURL = 'http://localhost:8000/questions';
				const fetchOptions = {};

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('FETCH REQUEST FAILED');

				const data = await response.json();
				console.log(data);
			} catch (error) {
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
