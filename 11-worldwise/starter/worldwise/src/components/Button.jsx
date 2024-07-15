import PropTypes from 'prop-types';
import styles from './../styles/Button.module.scss';

Button.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	type: PropTypes.string
};

export default function Button(props) {
	const { children, onClick, type } = props;

	return (
		<button
			type='button'
			className={`${styles.btn} ${styles[type]}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
