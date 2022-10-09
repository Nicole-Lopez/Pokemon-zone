import React,{useState, useEffect}  from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import {getPokemon, clear,pagination} from '../redux/actions/index'
import '../assets/styles/containers/HomePage.scss'
import Card from '../components/Card.jsx'
import InfiniteScroll from "react-infinite-scroll-component";
import CardHome from '../components/Skeleton loader/CardHome';
import NotFound from '../components/NotFound';
import Filters from '../components/Filters';
import RemoveFiltANDRandom from '../components/RemoveFiltANDRandom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'
import SearchBar from '../components/SearchBar';
import logo from '../assets/static/logo.png';


export default function HomePage () {
  const dispatch = useDispatch()
  const allPokemon = useSelector((state) => state.pokesPerPage)
  const filterANDorder = useSelector((state) => state.filterANDorder)
  const loader = useSelector((state) => state.load)
  const hasMore = useSelector((state) => state.hasMore);
  const notFound = useSelector((state) => state.notFound);

  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => { 
    if (!filterANDorder) {
      window.scrollTo(0,0);
      dispatch(clear())
      dispatch(getPokemon())
    } else{
      dispatch(pagination())
    }
  },[dispatch,filterANDorder])

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
          <svg className="home__createBTN__icon" fill="none" height="30" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"/><circle cx="9" cy="9" r="9" transform="translate(3 3)"/><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/></svg>
          <FontAwesomeIcon icon={faPlus} className="home__createBTN__icon"/>
        </button>  
      </Link>

      <SearchBar/>

      <FontAwesomeIcon icon={faFilter} className='filter_icon' onClick={()=>setFilterOpen(!filterOpen)} />
      {filterOpen && <div className="home__filters"><Filters/></div>}

      <div className="home__removeFilterANDrandom">
        <RemoveFiltANDRandom/>
      </div>

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
                <Card key={poke.id} name={poke.name} types={poke.types} image={poke.img} exp={poke.experience}/>
              )
            })}

        </InfiniteScroll>
      </div>

    </div>
  )
}     