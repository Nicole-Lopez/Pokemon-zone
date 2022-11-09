import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {getDetail} from '../redux/actions/index';
import DetailCard from "../components/DetailCard"
import '../assets/styles/containers/DetailPokemon.scss';
import ItemHall from '../components/ItemHall'
import {Link} from 'react-router-dom';

export default function DetailsPokemon() {

const dispatch = useDispatch();
const {name} = useParams()
const pokemonDetail = useSelector((state) => state.detail)
const status = useSelector((state) => state.status);

useEffect(() => {
    dispatch(getDetail(name))
}, [dispatch, name])

	
    return ( 
    <>
    {pokemonDetail.length > 0 &&
        <div className='detail-page'> 
            {status?
            	<div>
            		pewdipe
            	</div>
            :null}    
		    
		    <DetailCard
			    name={pokemonDetail[0].name}
			    img={pokemonDetail[0].img}
			    type={pokemonDetail[0].types}
			    weight={pokemonDetail[0].weight}
			    height={pokemonDetail[0].height}
			    attack={pokemonDetail[0].attack}
			    defense={pokemonDetail[0].defense}
			    speed={pokemonDetail[0].speed}
			    hp={pokemonDetail[0].hp}
			    exp={pokemonDetail[0].experience}
		    />

		    <h2 className='detail-page__title-hall'>HALL OF FAME</h2>
		    <div className='title_underline'></div>
		    
		    <Link to={`/hall/${name}`}>	
		    	<button className='upload_btn'>Upload picture</button>
	  		</Link>

	  		{pokemonDetail[0].hallOfFames.map((e,index)=>{
	  			return (
	  				<ItemHall key={e.id} title={e.title} image={e.image} flex={(index % 2) == 0?'row':'row-reverse'}/>
	  			)
			})}



        </div>
    }
    </>
    )
}