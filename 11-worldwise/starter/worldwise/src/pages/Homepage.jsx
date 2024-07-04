import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';

export default function Homepage() {
	return (
		<div>
			<PageNav />

			<Link to={'/app'}>Go to App</Link>
		</div>
	);
}
