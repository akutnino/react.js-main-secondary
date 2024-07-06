import styles from './Logo.module.scss';

function Logo() {
	return (
		<img
			src='/logo.png'
			alt='WorldWise logo'
			className={styles.logo}
		/>
	);
}

export default Logo;
