import React from 'react';
import  {useEffect} from 'react';
import {getDetail} from '../redux/actions/index';
import {useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Loader from './Loader.js'
// import '../assets/styles/components/Detail.css'
import sil from '../assets/static/silhouette.png';


export default function Detail() {
  
const dispatch = useDispatch();
const pokemonDetail = useSelector((state) => state.detail)
const {name} = useParams()


useEffect(() => {
    dispatch(getDetail(name))
}, [dispatch, name])

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


return (
    <div id='detail'>
       
        { 
         pokemonDetail.length > 0?


        <div className='pokeDet'>
          <h1>{pokemonDetail.name}</h1> 
          <img src={pokemonDetail.img} alt="mateo"/>           
         </div> :
         <Loader/>

}          
    </div>
  
)

}