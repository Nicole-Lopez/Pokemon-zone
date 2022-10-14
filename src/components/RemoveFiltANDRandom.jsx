import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilterCircleXmark,faX } from '@fortawesome/free-solid-svg-icons';
import {
    removeFilters,
    pagination,
    randomPokemon,
    cleanRandom,
} from "../redux/actions/index";
import Card from './Card.jsx';
import '../assets/styles/components/RandomPokemon.scss';
import pokeballClose from "../assets/static/pokeballClose.png";
import explosionEffect from "../assets/static/explosionEffect.gif";

export default function RemoveFiltANDRandom() {
 	const dispatch = useDispatch()
	const random = useSelector((state) => state.randomPokemon)
    const [openRandom,setOpenRandom] = useState(false)    
	const [ball,setBall] = useState(true)
	const [explosion, setExplosion] = useState(false)
	const [result, setResult] = useState(false)

    const handleRemove = () => {
        dispatch(removeFilters())
        dispatch(pagination())
    }

    const handleRandom = () => {
        dispatch(randomPokemon())
        setBall(false)
        setExplosion(true)
        
        setTimeout(() => {
        	setExplosion(false)
        }, 780)
        setTimeout(() => {
        	setResult(true)
        }, 500)        
    }

    const closeRandom = () => {
    	setOpenRandom(false)
    	dispatch(cleanRandom())
    	setBall(true)
    	setResult(false)
    	setExplosion(false)
    }

	return (
		<div className='removeFilterANDrandom'>
			<button className='removeFilterANDrandom__removeBTN' onClick={()=>handleRemove()}><FontAwesomeIcon icon={faFilterCircleXmark}/> Remove filters</button>

			<button className='removeFilterANDrandom__randomBTN' onClick={()=>setOpenRandom(true)}>Random pokemon <svg className="icon icon-tabler icon-tabler-pokeball" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"/><circle cx="9" cy="9" r="9" transform="translate(3 3)"/><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/></svg></button>        	
        	{openRandom &&
			<div className='removeFilterANDrandom__random'>
				<FontAwesomeIcon className='removeFilterANDrandom__random__close' onClick={()=>closeRandom()} icon={faX} />
				{ball && <img onClick={()=>handleRandom()} className='removeFilterANDrandom__random__ball' src={pokeballClose} alt="pok"/>}

				{explosion && <img className='removeFilterANDrandom__random__effect' src={explosionEffect} alt="lalala"/>}

				{result && <Card key={random.id} name={random.name} types={random.types} image={random.img} exp={random.experience} origin={random.original}/>}
			</div>}
        </div>	
	)
}