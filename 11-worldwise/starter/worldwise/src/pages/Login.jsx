import { useState } from 'react';
import styles from './Login.module.scss';
import PageNav from '../components/PageNav';

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');

	const handleUserEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleUserPassword = (event) => {
		setPassword(event.target.value);
	};

	return (
		<main className={styles.login}>
			<PageNav />

			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={handleUserEmail}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={handleUserPassword}
						value={password}
					/>
				</div>

				<div>
					<button>Login</button>
				</div>
			</form>
		</main>
	);
}
