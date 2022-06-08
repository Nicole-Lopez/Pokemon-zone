import React from 'react' ;
import '../assets/styles/components/SearchBar.css'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { getPokeName, clear } from '../redux/actions/index';
import searchIcon from '../assets/static/searchIcon.svg';

export default function SearchBar (){ 
    const dispatch = useDispatch()
    const [name, setName]= useState("")

    function handleSearch(e){
        e.preventDefault()
        setName(e.target.value)
    }
        
    function handleSubmit(e){
        e.preventDefault(e)
        dispatch(clear())   
        dispatch(getPokeName(name))
        setName("")
    }

    return(
        <div className='searchBarContainer'>
            <div id='searchBar'>
                <input className='search' type= 'text' placeholder="Search..." onChange={(e) => handleSearch(e)}/>
                <button type='submit' onClick={(e)=> handleSubmit(e)}><img src={searchIcon} alt='Search'/></button>
            </div>
        </div>
    )
}