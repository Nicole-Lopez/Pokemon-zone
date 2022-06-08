import React from 'react'
import '../assets/styles/components/Loader.css'
import load from '../assets/static/pikachu.gif'

export default function Loader () {
    return  (
        <div id="loader">
            <img src={load} alt='loading...' />
            <p>Loading pokemons...</p>
        </div>
    );
}