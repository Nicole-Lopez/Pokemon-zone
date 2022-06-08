 import React from 'react';
import '../assets/styles/components/Detail.css'
import {Link} from 'react-router-dom'
import Detail from '../components/Detail'
import BtnReturn from '../components/BtnReturn'

 export default function DetailsPokemon() {
     return ( 
         <div id='detailContainer'>
            <Detail />
			<BtnReturn />
         </div>
     )
 }