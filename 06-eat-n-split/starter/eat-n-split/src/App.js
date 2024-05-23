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
	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList />
				<FormAddFriend />
				<Button>Add Friend</Button>
			</div>

			<FormSplitBill />
		</div>
	);
}

function FriendsList(props) {
	const friends = initialFriends;

	return (
		<ul>
			{friends.map((friendObject) => (
				<FriendItem
					friendObject={friendObject}
					key={friendObject.id}
				/>
			))}
		</ul>
	);
}

function FriendItem(props) {
	const { friendObject } = props;

	const YOU_OWE_FRIEND_MONEY = friendObject.balance < 0;
	const FRIEND_OWES_YOU_MONEY = friendObject.balance > 0;
	const YOU_AND_FRIEND_EQUAL = friendObject.balance === 0;

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

			<Button>Select</Button>
		</li>
	);
}

function Button(props) {
	const { children } = props;

	return <button className='button'>{children}</button>;
}

function FormAddFriend(props) {
	return (
		<form className='form-add-friend'>
			<label>🧑‍🤝‍👩 Friend name</label>
			<input type='text' />

			<label>📷 Image URL</label>
			<input type='text' />

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill(props) {
	return (
		<form className='form-split-bill'>
			<h2>Split a bill with X</h2>

			<label>💰 Bill value</label>
			<input type='number' />

			<label>🧍‍♂️ Your expense</label>
			<input type='number' />

			<label>🧑‍🤝‍👩 X's expense</label>
			<input
				type='number'
				disabled
			/>

			<label>🤑 Who is paying the bill</label>
			<select>
				<option value='user'>You</option>
				<option value='friend'>X</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
