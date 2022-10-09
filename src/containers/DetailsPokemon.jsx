import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import {getDetail} from '../redux/actions/index';
import DetailCard from "../components/DetailCard"
import '../assets/styles/containers/DetailPokemon.scss';

export default function DetailsPokemon() {

const dispatch = useDispatch();
const {name} = useParams()
const pokemonDetail = useSelector((state) => state.detail)
const status = useSelector((state) => state.status);

useEffect(() => {
    dispatch(getDetail(name))
}, [dispatch, name])


    return ( 
        <div className='detail_container'>  
            {status?
            	<div>
            		pewdipe
            	</div>
            :null}    
		    {pokemonDetail.length > 0?
		    <>
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
			        convertValue={pokemonDetail[0].original?true:false}
		        />
		        <h2 className='hall_title'>HALL OF FAME</h2>
		        <div className='title_underline'></div>
		        <button className='upload_btn'>Upload picture</button>

	        </>
	        :null}
        </div>
    )
}