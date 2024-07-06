import styles from '../styles/Message.module.scss';

function Message({ message }) {
	return (
		<p className={styles.message}>
			<span role='img'>👋</span> {message}
		</p>
	);
}

export default Message;