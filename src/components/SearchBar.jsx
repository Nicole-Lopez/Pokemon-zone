import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {getPokeName,searchPokemon} from '../redux/actions/index';
import '../assets/styles/components/SearchBar.scss';

export default function SearchBar (){ 
    const dispatch = useDispatch()
    const search = useSelector((state) => state.search)

    const handleSearch = (e) => {
        dispatch(getPokeName(e))
        dispatch(searchPokemon(e))
    }

    return(
        <div className='searchBar'>
            <input  type= 'text' value={search} placeholder="Search..." onChange={e => handleSearch(e.target.value)}/>
            {search==="" && <FontAwesomeIcon icon={faMagnifyingGlass}/>}
        </div>
    )
}