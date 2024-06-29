import { useRef } from 'react';

export default function FinishScreen(props) {
	const { userPoints, totalMaxPoints, userHighscore } = props;
	const scorePercentage = Math.ceil(Number((userPoints / totalMaxPoints) * 100));
	const emoji = useRef(null);

	if (scorePercentage === 100) emoji.current = '⭐';
	if (scorePercentage >= 80 && scorePercentage < 100) emoji.current = '👌';
	if (scorePercentage >= 50 && scorePercentage < 80) emoji.current = '👍';
	if (scorePercentage >= 0 && scorePercentage < 50) emoji.current = '👎';
	if (scorePercentage === 0) emoji.current = '💀';

	return (
		<>
			<p className='result'>
				{emoji.current} You scored <strong>{userPoints}</strong> out of {totalMaxPoints} (
				{scorePercentage}%)
			</p>
			<p className='highscore'>(Highscore: {userHighscore} points)</p>
		</>
	);
}
