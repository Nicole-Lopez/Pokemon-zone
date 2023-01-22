import '../assets/styles/components/NotFound.scss';
import notFound from '../assets/static/404.png';

export default function NotFound () {
	return (
		<div className='notFound'>
			<div>
				<p>404</p>
				<p>NOT FOUND</p>
			</div>
			<img src={notFound} alt="Not Found"/>
		</div>
	)
}