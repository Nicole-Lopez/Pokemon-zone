import React from 'react';
import '../assets/styles/components/BtnReturn.css'
import {Link} from 'react-router-dom'

export default function BtnReturn() {
   	return ( 
   	    <div id='btnReturn'>
   	       	<Link to='/pokemons'>
   	       		<button className='return'>↩BACK</button>
   	       	</Link>
   	    </div>
   	)
}







