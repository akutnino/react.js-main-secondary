import { useState } from 'react';

const messages = [
	'Learn React ⚛️',
	'Apply for jobs 💼',
	'Invest your new income 🤑'
];

export default function App(props) {
	const [stepNumber, setStepNumber] = useState(1);

	const handleButtonPrevious = () => {
		setStepNumber((currentStepNumber) =>
			currentStepNumber === 1 ? 1 : currentStepNumber - 1
		);
	};

	const handleButtonNext = () => {
		setStepNumber((currentStepNumber) =>
			currentStepNumber === 3 ? 3 : currentStepNumber + 1
		);
	};

	return (
		<div className='steps'>
			<div className='numbers'>
				<div className={stepNumber >= 1 ? 'active' : ''}>1</div>
				<div className={stepNumber >= 2 ? 'active' : ''}>2</div>
				<div className={stepNumber >= 3 ? 'active' : ''}>3</div>
			</div>

			<p className='message'>
				Step {stepNumber} : {messages[stepNumber - 1]}
			</p>

			<div className='buttons'>
				<button
					style={{ backgroundColor: '#7950f2', color: '#fff' }}
					onClick={handleButtonPrevious}
				>
					Previous
				</button>
				<button
					style={{ backgroundColor: '#7950f2', color: '#fff' }}
					onClick={handleButtonNext}
				>
					Next
				</button>
			</div>
		</div>
	);
}
