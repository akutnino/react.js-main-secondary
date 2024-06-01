import { useState } from 'react';

const content = [
	{
		summary: 'React is a library for building UIs',
		details:
			'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		summary: 'State management is like giving state a home',
		details:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		summary: 'We can think of props as the component API',
		details:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
	}
];

export default function App() {
	return (
		<div>
			<Tabbed content={content} />
		</div>
	);
}

function Tabbed({ content }) {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<div className='tabs'>
				<Tab
					num={0}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<Tab
					num={1}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<Tab
					num={2}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<Tab
					num={3}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>

			{activeTab <= 2 ? (
				<TabContent
					itemObject={content.at(activeTab)}
					key={content.at(activeTab).summary}
				/>
			) : (
				<DifferentContent />
			)}
		</div>
	);
}

function Tab(props) {
	const { num, activeTab, setActiveTab } = props;

	const handleTab = () => {
		setActiveTab(num);
	};

	return (
		<button
			className={activeTab === num ? 'tab active' : 'tab'}
			onClick={handleTab}
		>
			Tab {num + 1}
		</button>
	);
}

function TabContent(props) {
	const { itemObject } = props;
	const [showDetails, setShowDetails] = useState(true);
	const [likes, setLikes] = useState(0);

	const handleDetails = () => {
		setShowDetails((currentState) => !currentState);
	};

	const handleInc = () => {
		setLikes((currentLikes) => (currentLikes += 1));
	};

	return (
		<div className='tab-content'>
			<h4>{itemObject.summary}</h4>
			{showDetails && <p>{itemObject.details}</p>}

			<div className='tab-actions'>
				<button onClick={handleDetails}>
					{showDetails ? 'Hide' : 'Show'} details
				</button>

				<div className='hearts-counter'>
					<span>{likes} ❤️</span>
					<button onClick={handleInc}>+</button>
					<button>+++</button>
				</div>
			</div>

			<div className='tab-undo'>
				<button>Undo</button>
				<button>Undo in 2s</button>
			</div>
		</div>
	);
}

function DifferentContent() {
	return (
		<div className='tab-content'>
			<h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
		</div>
	);
}
