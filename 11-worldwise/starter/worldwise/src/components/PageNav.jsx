import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.scss';

export default function PageNav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink
						to={'/'}
						className={styles.navLink}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to={'/product'}
						className={styles.navLink}
					>
						Product
					</NavLink>
				</li>
				<li>
					<NavLink
						to={'/pricing'}
						className={styles.navLink}
					>
						Pricing
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
