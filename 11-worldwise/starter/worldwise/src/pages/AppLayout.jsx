import Sidebar from '../components/Sidebar';
import styles from './../styles/AppLayout.module.scss';

export default function AppLayout() {
	return (
		<div className={styles.app}>
			<Sidebar />
		</div>
	);
}
