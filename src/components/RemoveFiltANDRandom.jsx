import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { removeFilters, randomPokemon, cleanRandom } from "../redux/actions/index";
import '../assets/styles/components/RemoveFiltANDRandom.scss';
import Card from './Card';
import Modal from './Modal';
import pokeballClose from "../assets/static/pokeballClose.png";
import explosionEffect from "../assets/static/explosionEffect.gif";
import PokeballIcon from '../assets/static/PokeballIcon';

export default function RemoveFiltANDRandom() {
 	const dispatch = useDispatch()
	const random = useSelector((state) => state.randomPokemon)
    const loader = useSelector((state) => state.load) 
    const [openRandom,setOpenRandom] = useState(false)    
	const [ball,setBall] = useState(true)
	const [explosion, setExplosion] = useState(false)
	const [result, setResult] = useState(false)

    const handleRandom = () => {
        dispatch(randomPokemon())
        setBall(false)
        setExplosion(true)
        
        setTimeout(() => setExplosion(false), 780)
        setTimeout(() => setResult(true), 500)        
    }

    const closeRandom = () => {
    	setOpenRandom(false)
    	dispatch(cleanRandom())
    	setBall(true)
    	setResult(false)
    	setExplosion(false)
    }

	return (
		<div className='rem-filter-and-random'>
			<button onClick={()=>dispatch(removeFilters())} disabled={loader}><FontAwesomeIcon icon={faFilterCircleXmark}/>Remove filters</button>

			<button onClick={()=>setOpenRandom(true)} disabled={loader}>Random pokemon<PokeballIcon/></button>        	
    			
            <Modal visible={openRandom} closeModal={closeRandom}>
                {ball && <img onClick={()=>handleRandom()} className='random-ball' src={pokeballClose} alt="click!"/>}

                {explosion && <img className='random-effect' src={explosionEffect} alt="booom!"/>}

                {result && <Card key={random.id} name={random.name} types={random.types} image={random.img} exp={random.experience} original={random.original}/>}
            </Modal>    
        </div>	
	)
}