import { useEffect } from 'react';

export default function Timer(props) {
	const { secondsRemaining, dispatch } = props;

	useEffect(() => {
		const intervalObject = setInterval(() => {
			if (secondsRemaining === 0) {
				dispatch({ type: 'endQuiz' });
			} else {
				dispatch({ type: 'updateRemainingTime' });
			}
		}, 1000);

		return () => {
			clearInterval(intervalObject);
		};
	}, [secondsRemaining, dispatch]);

	return <div className='timer'>{secondsRemaining}</div>;
}
