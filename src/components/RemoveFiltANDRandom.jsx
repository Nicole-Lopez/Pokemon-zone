import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {
    removeFilters,
    pagination
} from "../redux/actions/index"
import '../assets/styles/components/Filter.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilterCircleXmark } from '@fortawesome/free-solid-svg-icons'
import RandomPokemon from "./RandomPokemon"


export default function RemoveFiltANDRandom() {
 	const dispatch = useDispatch()

    const [openRandom,setOpenRandom] = useState(false);    

    function handleRemove(){
        dispatch(removeFilters())
        dispatch(pagination())
    }


	return (
		<div>
			<div className='remove_random_container'>
				<button className='remove_btn' onClick={()=>handleRemove()}><FontAwesomeIcon icon={faFilterCircleXmark} /> Remove filters</button>
				<button className='random_btn' onClick={()=>setOpenRandom(true)}>Random pokemon <svg className="icon icon-tabler icon-tabler-pokeball" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"/><circle cx="9" cy="9" r="9" transform="translate(3 3)"/><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/></svg></button>
			    <RandomPokemon open={openRandom} onClose={()=>setOpenRandom(false)}/>
            </div>			
		</div>
	)
}