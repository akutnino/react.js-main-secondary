import { useReducer } from 'react';

const initialState = {
	inputStep: 1,
	inputCount: 0
};

const dateCounterReducer = (currentState, action) => {
	switch (action.type) {
		case 'DefineStep':
			return {
				...currentState,
				inputStep: action.payload
			};

		case 'Decrease':
			return {
				...currentState,
				inputCount: currentState.inputCount - currentState.inputStep
			};

		case 'Increase':
			return {
				...currentState,
				inputCount: currentState.inputCount + currentState.inputStep
			};

		case 'DefineCount':
			return {
				...currentState,
				inputCount: action.payload
			};

		case 'Reset':
			return {
				inputStep: 1,
				inputCount: 0
			};

		default:
			return currentState;
	}
};

export default function DateCounter(props) {
	const [state, dispatch] = useReducer(dateCounterReducer, initialState);

	const dateObject = new Date(new Date().toDateString());
	dateObject.setDate(dateObject.getDate() + state.inputCount);

	const handleDefineStep = (event) => {
		dispatch({
			type: 'DefineStep',
			payload: Number(event.target.value)
		});
	};

	const handleInputDecrease = () => {
		dispatch({ type: 'Decrease' });
	};

	const handleInputIncrease = () => {
		dispatch({ type: 'Increase' });
	};

	const handleDefineCount = (event) => {
		dispatch({
			type: 'DefineCount',
			payload: Number(event.target.value)
		});
	};

	const handleReset = () => {
		dispatch({ type: 'Reset' });
	};

	return (
		<div className='counter'>
			<div>
				<input
					type='range'
					min={1}
					max={10}
					value={state.inputStep}
					onChange={handleDefineStep}
				/>
				<span>{state.inputStep}</span>
			</div>

			<div>
				<button onClick={handleInputDecrease}>-</button>
				<input
					value={state.inputCount}
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
