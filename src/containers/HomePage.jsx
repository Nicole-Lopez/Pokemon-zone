import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'usehooks-ts';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faX } from '@fortawesome/free-solid-svg-icons';
import { getPokemon, paginationHome, setPage, cleanDetail } from '../redux/actions/index';
import '../assets/styles/containers/HomePage.scss';
import NotFound from '../components/NotFound';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import RemoveFiltANDRandom from '../components/RemoveFiltANDRandom';
import Card from '../components/Card';
import CardSkeleton from '../components/Skeleton loader/CardSkeleton';
import logoPokemon from '../assets/static/logo.png';
import PokeballIcon from '../assets/static/PokeballIcon';
import SkeletonLoader from '../components/Skeleton loader/SkeletonLoader';


export default function HomePage () {
    const mobile = useMediaQuery('(max-width: 1100px)')
    const dispatch = useDispatch()
    const pokesPerPage = useSelector((state) => state.pokesPerPage)
    const allPokemons = useSelector((state) => state.allPokemons)
    const pokemons = useSelector((state) => state.pokemons)
    const loader = useSelector((state) => state.load)
    const hasMore = useSelector((state) => state.hasMorePokemon);
    const detail = useSelector((state) => state.detail);

    const [filterOpen, setFilterOpen] = useState(false)

    useEffect(() => {
        if (!allPokemons.length) dispatch(getPokemon())
    }, [dispatch, allPokemons])    

    useEffect(() => { 
        window.scrollTo(0,0);
        dispatch(setPage());
        dispatch(paginationHome())
    }, [dispatch, pokemons])

    useEffect(() => {
        if (detail.length) dispatch(cleanDetail()) 
    }, [dispatch, detail])


    return (
        <div className='homepage'>
            <img className='homepage__logo' src={logoPokemon} alt="Pokémon"/>

            {loader? 
                <SkeletonLoader className='homepage__create-button'/>                
                :
                <Link to='/pokemons/create' className='homepage__create-button'>
                    <span>{mobile ? '+' : 'CREATE YOUR POKÉMON!'}</span>
                    <PokeballIcon/>
                </Link>
            }

            {loader ?                             
                <SkeletonLoader 
                    width='220px' 
                    height='38px' 
                    wrapperStyle={{borderRadius: '3rem'}}
                    className='search-bar'
                /> 
                : <SearchBar/>
            }

            <div className="homepage__filters">
                {mobile?
                    <>
                        <button onClick={()=>setFilterOpen(true)} disabled={loader}><FontAwesomeIcon icon={faFilter}/></button>
                        <div className={`filters-mobile ${filterOpen && "filters-mobile--open"}`}>
                            {filterOpen && <FontAwesomeIcon icon={faX} onClick={()=>setFilterOpen(false)}/>}
                            <Filters/>
                        </div>           
                    </>
                    : loader? 
                        <>
                            <SkeletonLoader 
                                width='520px' 
                                height='40px' 
                                wrapperStyle={{borderRadius: '15px 15px 0 0', margin:'1px auto'}}
                            />                          
                            <SkeletonLoader 
                                width='1048px' 
                                height='40px' 
                                wrapperStyle={{borderRadius: '15px', margin:'1px auto'}}
                            />    
                        </>                    
                        :
                        <Filters/>
                }
            </div>

            <RemoveFiltANDRandom/>

            <div className="homepage__cards-container">
                {loader?
                    <div className='cards-container'>
                        <CardSkeleton/><CardSkeleton/><CardSkeleton/><CardSkeleton/>
                    </div>
                    : pokemons.length? 
                        <InfiniteScroll
                            dataLength={pokesPerPage.length}
                            hasMore={hasMore}
                            next={() => dispatch(paginationHome())}
                            loader={<><CardSkeleton/><CardSkeleton/></>}
                            endMessage={!hasMore && pokemons.length && <p className='endMessage'>Wow! Looks like you've come to an end!</p>}
                            className='cards-container'
                        >
                            {pokesPerPage.map(pokemon=>{
                                return (
                                    <Card key={pokemon.id} name={pokemon.name} types={pokemon.types} image={pokemon.img} exp={pokemon.experience} original={pokemon.original}/>
                                )
                            })}
                        </InfiniteScroll>
                    :
                    <NotFound/>
                }
            </div>
        </div>
    )
}     