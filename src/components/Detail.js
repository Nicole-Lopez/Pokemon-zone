import React from 'react';
import  {useEffect} from 'react';
import {getDetail} from '../redux/actions/index';
import {useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Loader from './Loader.js'
import '../assets/styles/components/Detail.css'
import sil from '../assets/static/silhouette.png';


export default function Detail() {
  
const dispatch = useDispatch();
const pokemonDetail = useSelector((state) => state.detail)
const {id} = useParams()


useEffect(() => {
    dispatch(getDetail(id))
}, [dispatch, id])

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


return (
    <div id='detail'>
       
        { 
         pokemonDetail.length > 0?


        <div className='pokeDet'>
          <div className='detLeft'>
            <div className='ide'>
              <p>{pokemonDetail[0].ide? pokemonDetail[0].ide :null}</p>         
            </div>
            <img src={pokemonDetail[0].img? pokemonDetail[0].img : sil} alt={pokemonDetail[0].name}/> 
            
          </div>    
          <div className='detRigth'>      
            <p className='info'><span>NAME: </span>{pokemonDetail[0].name? pokemonDetail[0].name :null}</p>
            <p className='info'><span>HP:</span> {pokemonDetail[0].hp? pokemonDetail[0].hp :null}</p>
            <p className='info'><span>ATTACK:</span> {pokemonDetail[0].attack? pokemonDetail[0].attack :null}</p>
            <p className='info'><span>DEFENSE:</span> {pokemonDetail[0].defense? pokemonDetail[0].defense :null}</p>
            <p className='info'><span>SPEED:</span> {pokemonDetail[0].speed? pokemonDetail[0].speed :null}</p>
            <p className='info'><span>HEIGHT:</span> {pokemonDetail[0].height? pokemonDetail[0].height :null}</p>
            <p className='info'><span>WEIGTH:</span> {pokemonDetail[0].weight? pokemonDetail[0].weight :null}</p>  
            <p className='info'><span>TYPES:</span> {pokemonDetail[0].types? pokemonDetail[0].types.map(el => <p>• {capitalizeFirstLetter(el)}</p>) :null}</p>
          </div>            
         </div> :
         <Loader/>

}          
    </div>
  
)

}