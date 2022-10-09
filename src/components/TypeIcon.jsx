import React from 'react'
import '../assets/styles/components/TypeIcon.scss'

export default function TypeIcon({icon, name}) {
	return (
		<div className='typeIcon'>
			<img className='typeIcon__icon' src={icon} alt={name}/>
			<span className='typeIcon__tooltip'>{name}</span>
		</div>
	)
}