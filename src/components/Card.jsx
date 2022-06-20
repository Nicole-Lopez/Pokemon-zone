import React from 'react'
import '../assets/styles/components/Card.scss'

export default function Card({name, types, image, exp}) {
	
	function uppercaseFirstLetter(str) {
  		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div className='card_container'>
			<p className='poke_experience'>{exp}</p>
			<img className='poke_img' src={image} alt="pokemon"/>
			<p className='poke_name'>{uppercaseFirstLetter(name)}</p>
			<div className='poke_types'>
				{types.map(e=>{
					return(
						<img key={e.id} className='type_icon' src={e.icon} alt="icon_type"/>	
					)			
				})}				
			</div>

		</div>
	)
}