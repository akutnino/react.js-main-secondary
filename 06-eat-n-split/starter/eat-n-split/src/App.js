import { useState } from 'react';

const initialFriends = [
	{
		id: 118836,
		name: 'Clark',
		image: 'https://i.pravatar.cc/48?u=118836',
		balance: -7
	},
	{
		id: 933372,
		name: 'Sarah',
		image: 'https://i.pravatar.cc/48?u=933372',
		balance: 20
	},
	{
		id: 499476,
		name: 'Anthony',
		image: 'https://i.pravatar.cc/48?u=499476',
		balance: 0
	}
];

export default function App(props) {
	const [friendsArray, setFriendsArray] = useState(initialFriends);
	const [isFormAddFriendOpen, setIsFormAddFriendOpen] = useState(false);
	const [selectedFriendItem, setSelectedFriendItem] = useState(null);

	const handleAddFriend = () => {
		setIsFormAddFriendOpen((currentState) => !currentState);
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList
					friendsArray={friendsArray}
					selectedFriendItem={selectedFriendItem}
					setSelectedFriendItem={setSelectedFriendItem}
				/>

				{isFormAddFriendOpen && (
					<FormAddFriend
						setFriendsArray={setFriendsArray}
						setIsFormAddFriendOpen={setIsFormAddFriendOpen}
					/>
				)}

				<Button onClick={handleAddFriend}>
					{isFormAddFriendOpen ? 'Close' : 'Add Friend'}
				</Button>
			</div>

			{selectedFriendItem && (
				<FormSplitBill selectedFriendItem={selectedFriendItem} />
			)}
		</div>
	);
}

function FriendsList(props) {
	const { friendsArray, selectedFriendItem, setSelectedFriendItem } = props;

	return (
		<ul>
			{friendsArray.map((friendObject) => (
				<FriendItem
					friendObject={friendObject}
					selectedFriendItem={selectedFriendItem}
					setSelectedFriendItem={setSelectedFriendItem}
					key={friendObject.id}
				/>
			))}
		</ul>
	);
}

function FriendItem(props) {
	const { friendObject, selectedFriendItem, setSelectedFriendItem } = props;

	const YOU_OWE_FRIEND_MONEY = friendObject.balance < 0;
	const FRIEND_OWES_YOU_MONEY = friendObject.balance > 0;
	const YOU_AND_FRIEND_EQUAL = friendObject.balance === 0;

	const handleSelectedFriend = (friendObject) => {
		return () =>
			setSelectedFriendItem((currrentSelectedFriendItem) =>
				currrentSelectedFriendItem?.id === friendObject.id ? null : friendObject
			);
	};

	return (
		<li>
			<img
				src={friendObject.image}
				alt={friendObject.name}
			/>
			<h3>{friendObject.name}</h3>

			{YOU_OWE_FRIEND_MONEY && (
				<p className='red'>
					You owe {friendObject.name} ${Math.abs(friendObject.balance)}
				</p>
			)}

			{FRIEND_OWES_YOU_MONEY && (
				<p className='green'>
					{friendObject.name} owes you ${friendObject.balance}
				</p>
			)}

			{YOU_AND_FRIEND_EQUAL && <p>You and {friendObject.name} are even</p>}

			<Button onClick={handleSelectedFriend(friendObject)}>
				{selectedFriendItem?.id === friendObject.id ? 'Close' : 'Select'}
			</Button>
		</li>
	);
}

function Button(props) {
	const { onClick, children } = props;

	return (
		<button
			className='button'
			onClick={onClick}
		>
			{children}
		</button>
	);
}

function FormAddFriend(props) {
	const { setFriendsArray, setIsFormAddFriendOpen } = props;
	const [friendName, setFriendName] = useState('');
	const [imageURL, setImageURL] = useState('https://i.pravatar.cc/48?u=');

	const handleFriendName = (event) => {
		setFriendName(event.target.value);
	};

	const handleImageURL = (event) => {
		setImageURL(event.target.value);
	};

	const handleCreateFriend = (event) => {
		event.preventDefault();

		if (friendName === '') return;

		const newFriendObjectID = crypto.randomUUID();

		const newFriendObject = {
			id: newFriendObjectID,
			name: friendName,
			image: `${imageURL}${newFriendObjectID}`,
			balance: 0
		};

		setFriendsArray((currentFriendsArray) => [
			...currentFriendsArray,
			newFriendObject
		]);
		setIsFormAddFriendOpen((currentState) => !currentState);
		setFriendName('');
		setImageURL('https://i.pravatar.cc/48?u=');
	};

	return (
		<form
			className='form-add-friend'
			onSubmit={handleCreateFriend}
		>
			<label>🧑‍🤝‍👩 Friend name</label>
			<input
				type='text'
				onChange={handleFriendName}
				value={friendName}
			/>

			<label>📷 Image URL</label>
			<input
				type='text'
				onChange={handleImageURL}
				value={imageURL}
			/>

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill(props) {
	const { selectedFriendItem } = props;

	return (
		<form className='form-split-bill'>
			<h2>Split a bill with {selectedFriendItem?.name}</h2>

			<label>💰 Bill value</label>
			<input type='number' />

			<label>🧍‍♂️ Your expense</label>
			<input type='number' />

			<label>🧑‍🤝‍👩 {selectedFriendItem?.name}'s expense</label>
			<input
				type='number'
				disabled
			/>

			<label>🤑 Who is paying the bill</label>
			<select>
				<option value='user'>You</option>
				<option value='friend'>{selectedFriendItem?.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
