import React from 'react' ;
import '../assets/styles/components/SearchBar.scss'
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { 
    getPokeName, 
    clear,
    setPage, 
    pagination,
} from '../redux/actions/index';
import searchIcon from '../assets/static/searchIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar (){ 
    const dispatch = useDispatch()
  const navigate = useNavigate();

    const [name, setName]= useState("")

    useEffect(() => {
        if (name === "") {
            return navigate('/');
        }
        dispatch(setPage());
        dispatch(getPokeName(name))
        
        navigate(`?name=${name}`);
        dispatch(pagination())
    }, [name])

    function handleSearch(e){
        setName(e)
    }
        
    function handleSubmit(e){
        e.preventDefault(e)
        // dispatch(clear())   
        dispatch(getPokeName(name))
        setName("")
    }

    return(
        <div className='searchBar_container'>
            <input  type= 'text' placeholder="Search..." onChange={event=>{handleSearch(event.target.value)}}/>
            {(name==="")?<FontAwesomeIcon className='search_icon' icon={faMagnifyingGlass} />:null}
        </div>
    )
}