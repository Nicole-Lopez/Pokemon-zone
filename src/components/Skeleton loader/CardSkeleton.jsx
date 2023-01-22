import '../../assets/styles/components/SkeletonLoader.scss';
import pokeball from '../../assets/static/pokeballClose.png';

export default function CardSkeleton() {
	return (
		<div className='skeleton-loader skeleton-loader--card'>
			<img src={pokeball} alt='loading...'/>	
		</div>	
	)
}