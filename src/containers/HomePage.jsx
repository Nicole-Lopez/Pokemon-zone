import React,{useState, useEffect}  from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {getPokemon, clear,pagination,handleMobile,setPage} from '../redux/actions/index'
import '../assets/styles/containers/HomePage.scss'
import Card from '../components/Card.jsx'
import InfiniteScroll from "react-infinite-scroll-component";
import CardHome from '../components/Skeleton loader/CardHome';
import NotFound from '../components/NotFound';
import Filters from '../components/Filters';
import RemoveFiltANDRandom from '../components/RemoveFiltANDRandom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus,faX } from '@fortawesome/free-solid-svg-icons'
import SearchBar from '../components/SearchBar';
import logo from '../assets/static/logo.png';
import { useWindowSize } from 'usehooks-ts'

export default function HomePage () {
  const dispatch = useDispatch()
  const allPokemon = useSelector((state) => state.pokesPerPage)
  const todosPokemon = useSelector((state) => state.allPokemons)
  const lyna = useSelector((state) => state.pokemons)
  const filterANDorder = useSelector((state) => state.filterANDorder)
  const loader = useSelector((state) => state.load)
  const hasMore = useSelector((state) => state.hasMore);
  const notFound = useSelector((state) => state.notFound);
  const mobile = useSelector((state) => state.mobile);

  const [filterOpen, setFilterOpen] = useState(false)

  const { width, height } = useWindowSize()



  useEffect(() => {
    if (width < 1100) {
      dispatch(handleMobile(true))
    } else {
      dispatch(handleMobile(false))
    }
  }, [width])

  useEffect(() => { 
    window.scrollTo(0,0);
    dispatch(setPage());
    dispatch(pagination())
  },[dispatch,lyna])


  useEffect(() => {
    if (!todosPokemon[0]) {
      dispatch(getPokemon())    
    }
  }, [dispatch])

  useEffect(() => {
    if (loader===false) {
      dispatch(pagination()) 
    }
  }, [dispatch, loader])


  return (
    <div className='home'>
      <img className='home__logo' src={logo} alt="pokémon"/>

      <Link to='/pokemons/create' className='home__createBTN'>
        <button>
          {!mobile && <span>CREATE YOUR POKEMON!</span>}
          <svg className="home__createBTN__icon" fill="none" height="30" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"/><circle cx="9" cy="9" r="9" transform="translate(3 3)"/><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/></svg>
          {mobile && <FontAwesomeIcon icon={faPlus} className="home__createBTN__icon"/>}
        </button>  
      </Link>

      <SearchBar/>

      <div className="home__filters">
        {mobile?
          <>
            <FontAwesomeIcon icon={faFilter} onClick={()=>setFilterOpen(true)} />
            <div className={`home__filters__menuResponsive ${filterOpen && "open"}`}>
              {filterOpen && <FontAwesomeIcon icon={faX} onClick={()=>setFilterOpen(false)}/>}
              <Filters/>
            </div>           
          </>
        :<Filters/>}
      </div>

      <RemoveFiltANDRandom/>

      <div className="home__cards">
      <InfiniteScroll className='home__cards__container'
         dataLength={allPokemon.length}
         hasMore={hasMore}
         next={()=>dispatch(pagination())}
         loader={<CardHome/>}
         // endMessage={allPokemon.length && allPokemon.length>=4?
         //    <p className='endMessage'>Wow! Looks like you've come to an end!</p>
         //    :null
         // }
         >
            {loader?<CardHome/>:
              notFound?<NotFound/>:allPokemon.map(poke=>{
              return (
                <Card key={poke.id} name={poke.name} types={poke.types} image={poke.img} exp={poke.experience} origin={poke.original}/>
              )
            })}
        </InfiniteScroll>
      </div>

    </div>
  )
}     