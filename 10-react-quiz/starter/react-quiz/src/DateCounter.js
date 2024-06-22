import { useState } from 'react';

export default function DateCounter(props) {
	const [inputCount, setInputCount] = useState(0);
	const [inputStep, setInputStep] = useState(1);

	// This mutates the date object.
	const dateObject = new Date(new Date().toDateString());
	dateObject.setDate(dateObject.getDate() + inputCount);

	const handleInputDecrease = () => {
		// setCount((count) => count - 1);
		setInputCount((currentInputCount) => currentInputCount - inputStep);
	};

	const handleInputIncrease = () => {
		// setCount((count) => count + 1);
		setInputCount((currentInputCount) => currentInputCount + inputStep);
	};

	const handleDefineCount = (event) => {
		setInputCount(Number(event.target.value));
	};

	const handleDefineStep = (event) => {
		setInputStep(Number(event.target.value));
	};

	const handleReset = () => {
		setInputCount(0);
		setInputStep(1);
	};

	return (
		<div className='counter'>
			<div>
				<input
					type='range'
					min='0'
					max='10'
					value={inputStep}
					onChange={handleDefineStep}
				/>
				<span>{inputStep}</span>
			</div>

			<div>
				<button onClick={handleInputDecrease}>-</button>
				<input
					value={inputCount}
					onChange={handleDefineCount}
				/>
				<button onClick={handleInputIncrease}>+</button>
			</div>

			<p>{dateObject.toDateString()}</p>

			<div>
				<button onClick={handleReset}>Reset</button>
			</div>
		</div>
	);
}
