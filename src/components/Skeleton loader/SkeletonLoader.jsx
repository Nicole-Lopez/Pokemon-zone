import '../../assets/styles/components/SkeletonLoader.scss';

export default function SkeletonLoader({width, height, wrapperStyle, className}) {
	return (
		<div className={`skeleton-loader ${className}`} style={{width: width, height: height, ...wrapperStyle}}>
		</div>
	)
}