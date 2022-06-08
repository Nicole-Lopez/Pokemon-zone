import React from "react";
import { Link } from "react-router-dom";
import '../assets/styles/containers/LandingPage.css'

export default function LandingPage() {
    return(
        <div id='landing'>
           <h1>WELCOME</h1>
            <Link to='./pokemons'>
            	<button>GO!</button>
            </Link>
        </div>
    )
};