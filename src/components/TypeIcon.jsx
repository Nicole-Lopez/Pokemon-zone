import '../assets/styles/components/TypeIcon.scss';

export default function TypeIcon({icon, name}) {
	return (
		<div className='typeIcon'>
			<img src={icon} alt={name}/>
			<span>{name}</span>
		</div>
	)
}