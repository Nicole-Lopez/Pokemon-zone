import React from 'react'
import '../assets/styles/components/Nav.css'
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getPokemon, filterByOrder, filterByAttack, getType, filterByType, filterByDb} from '../redux/actions/index'
import SearchBar from './SearchBar';
import logo from '../assets/static/logo.png'
import pokSil from '../assets/static/silhouette.png'

export default function Nav ({setCurrentPage , setOrder}) {
    const dispatch = useDispatch()
   
    const allTypes = useSelector((state) => state.typePokemon)
    
    
    useEffect(() => { 
        // dispatch(getPokemon())
        dispatch(getType())
    },[dispatch])
    


    function handleOrder(e){
        e.preventDefault();
        dispatch(filterByOrder(e.target.value))
        setCurrentPage(1);
        setOrder(`${e.target.value}`)
    }

    function handleAttack(e){
        e.preventDefault();
        dispatch(filterByAttack(e.target.value))
        setCurrentPage(1);
        setOrder(`${e.target.value}`)
    }   
    function handleFilterType (e){
        dispatch(filterByType(e.target.value))
        setCurrentPage(1);
        setOrder(`${e.target.value}`)        
    }
    function handleCreated(e){
        dispatch(filterByDb(e.target.value))
        setCurrentPage(1);
        setOrder(`${e.target.value}`)
    }
    
   
    
        
    return (        
        <div id='nav'>
            <div className='navTop'>
                <Link to='/pokemons/create'> 
                    <button className='btnHomeCreate'>CREATE YOUR POKEMON! <img src={pokSil} alt="."/></button>  
                </Link>
                <img id='logo' src={logo} alt='Logo pokemon'/>
                <SearchBar/>
            </div>

            <div className='navBottom'>
                <select onChange={(e) => handleOrder(e)}>
                    <option selected disabled>ORDER ALPHABETICALLY</option>
                    <option value="all">DEFAULT</option>
                    <option value='asc'>A-Z</option>
                    <option value='des'>Z-A</option>
                </select>

                <select onChange={(e) => handleAttack(e)} >
                    <option selected disabled>FILTER BY ATTACK</option>
                    <option value="all">ALL</option>
                    <option value='major'>WEAK TO STRONG</option>
                    <option value='minor'>STRONG TO WEAK</option>
                </select>

                <select onChange={e=> handleCreated(e)}>
                    <option selected disabled>FILTER BY ORIGIN</option>
                    <option value="all">ALL</option>
                    <option value="db">CREATED</option>
                    <option value="api">EXISTING</option>
                </select>

                <select onChange={(e) => handleFilterType (e)}>
                    <option selected disabled>TYPES</option>
                    <option value="allTypes">ALL</option>
                    {allTypes?.map(el => {
                        return (
                            <option key={el.id} name={el.name}>{el.name}</option>
                        )
                    })}
                </select>
                
            </div>
            
        </div>
              
    )
}
    
