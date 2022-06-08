import React from 'react';
import '../assets/styles/components/Pokemon.css'
import pokemonDefault from '../assets/static/silhouette.png'
import pokeballClose from '../assets/static/pokeballClose.png'
import {Link} from 'react-router-dom'


 export default function Pokemon ({name, type, img, id}) {
     return ( 
        <div id='pokContainer'>
        <Link to={"/pokemons/" + id} id='text-link'>
            <h3>{name}</h3>
            <div className="card">
                {
                 img?<img id={name}  className= 'pokImg' src={img} alt='Not Found'/>
                    :<img id={name} className='pokImg' src={pokemonDefault} alt='Not Found'/>
                }
                <img className='pokBackground' src={pokeballClose} alt="."/>
            </div>

            <h4 className='pokTypeT'>Type</h4>
            <p className='pokType'>{type}</p>
        </Link>    
        </div>
     )
 }
 