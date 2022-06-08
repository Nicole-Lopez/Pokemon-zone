import React from 'react'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPokemon, clear} from '../redux/actions/index'
import Nav from '../components/Nav'
import Pokemon from '../components/Pokemon'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import '../assets/styles/containers/HomePage.css'
import NotFound from '../components/NotFound.js'


export default function HomePage () {
  const dispatch = useDispatch()
  
  const load = useSelector((state) => state.load)
  const allPokemon = useSelector((state) => state.pokemons)

  const [order, setOrder]= useState('')



  const [currentPage,setCurrentPage]= useState(1)
  const [pokePerPage, setPokePerPage]= useState(12) 
  const indexOfLastPoke = currentPage * pokePerPage 
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage
  const currentPokemon = allPokemon.slice(indexOfFirstPoke,indexOfLastPoke)

  useEffect(() => { 
      dispatch(clear())
      dispatch(getPokemon())
  },[dispatch])

 



  return (
      <div id='home'>
        <div>    
          <Nav  setCurrentPage={setCurrentPage} setOrder={setOrder}/>
          <Pagination pokePerPage={pokePerPage}  allPokemon={allPokemon.length} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>
        <div className='pokemonsHome'>
            {load? (<Loader/>) : !allPokemon.length?(<NotFound />):
            currentPokemon.map(el =>{
                return (
                      <Pokemon name={el.name } img={el.img} type={ el.types.map(el => <p>{el}</p>)} key={el.id} id={el.ide}/>
                )
            })
            }
        </div>
    </div>
  )
}
  
      