import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/styles/components/Card.scss';
import TypeIcon from './TypeIcon';
import pokeballClose from "../assets/static/pokeballClose.png"


export default function Card({name, types, image, exp, origin}) {
	
	const uppercaseFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
	
	return (
        <Link to={"/detail/" + name} className='cardHome'>
			{!origin?
				<div className='cardHome__pokefan'>
					<p>POKÉFAN</p>
					<img src={pokeballClose} alt="pokefan" />
				</div>
			:null}

			<p className='cardHome__experience'>exp{exp}</p>
			<img className='cardHome__img' src={image} alt={name}/>
			<p className='cardHome__name'>{uppercaseFirstLetter(name)}</p>
			<div className='cardHome__types'>
				{types.map(e=>{
					return(
						<TypeIcon key={e.id} icon={e.icon} name={e.name}/>	
					)			
				})}				
			</div>
        </Link>    
	)
}