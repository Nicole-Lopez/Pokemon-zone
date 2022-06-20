import React from 'react'
import {Link} from 'react-router-dom'

import '../assets/styles/components/Header.scss'

import logo from '../assets/static/logo.png'
import pokeballClose from '../assets/static/pokeballClose.png'
import SearchBar from '../components/SearchBar'
import Filters from './Filters'

export default function Header() {
	return (
		<div className='header_container'>
			<div className='header_top'>
				<Link to='/pokemons/create' className='link'>
					<button className='create_btn'><img src={pokeballClose} alt="create"/><span>CREATE YOUR POKEMON!</span></button>  
				</Link>
				<img className='logo' src={logo} alt="logo"/>
				<SearchBar/>
			</div>
			<Filters/>
		</div>
	)
}