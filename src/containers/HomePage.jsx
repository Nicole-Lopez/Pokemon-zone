import React from 'react'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPokemon, clear,getType,pagination,setPage} from '../redux/actions/index'
import Nav from '../components/Nav'
import Pokemon from '../components/Pokemon'
import Pagination from '../components/Pagination'
// import Loader from '../components/Loader'
import '../assets/styles/containers/HomePage.scss'
import NotFound from '../components/NotFound.js'
import Header from '../components/Header'
import Card from '../components/Card.jsx'
import InfiniteScroll from "react-infinite-scroll-component";

export default function HomePage () {
  const dispatch = useDispatch()
  const allPokemon = useSelector((state) => state.pokesPerPage)
  const filterANDorder = useSelector((state) => state.filterANDorder)
  const loader = useSelector((state) => state.load)

  const [currentPage,setCurrentPage]= useState(1)
  const [pokePerPage, setPokePerPage]= useState(8) 

  const [indexOfLastPoke, setIndexOfLastPoke]= useState(8)

  // const indexOfLastPoke = currentPage * pokePerPage 

  // const [currentPokemon, setCurrentPokemon]= useState(allPokemon.slice(0,16)) 

  let currentPokemon = allPokemon.slice(0,indexOfLastPoke)








  useEffect(() => { 
    if (!filterANDorder) {
     
      dispatch(clear())
      dispatch(getPokemon())
      dispatch(getType())
      
    } else{
      dispatch(pagination())
    }

  },[dispatch,filterANDorder])

  useEffect(() => {

    if (loader===false) {
      dispatch(pagination()) 
    }
    
  }, [loader])


  return (
      <div id='home'>
        <Header />


       <InfiniteScroll className='home_cards_container'
        dataLength={allPokemon.length}
        hasMore={true}
        next={()=>dispatch(pagination())}
        // loader={<p>Cargando...</p>}
        >


          {allPokemon?.map(poke=>{
            return (
              <Card key={poke.id} name={poke.name} types={poke.types} image={poke.img} exp={poke.experience}/>
            )
          })}


       </InfiniteScroll>


    </div>
  )
}
  
      