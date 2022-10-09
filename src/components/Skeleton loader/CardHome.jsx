import React from 'react'
import '../../assets/styles/components/Skeleton Loader/CardHome.scss'
import pokeball from '../../assets/static/pokeballClose.png'

export default function CardHome() {
	return (
		<div className='skeleton_container'>
			<img src={pokeball} />	
		</div>	
	)
}