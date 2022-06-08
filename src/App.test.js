import React from 'react'
import App from "./App";
import { render, screen } from "@testing-library/react";
import rootReducer from "./redux/reducer/index";
import store from "./redux/store/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import LandingPage from './containers/LandingPage'

import { MemoryRouter as Router } from 'react-router-dom';





test('POKEMON COMPONENT render content', () => {
	const note = { 
		name: 'Pikachu', 
		types: ['electric', 'poison'], 
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png', 
		ide: 45
	}

	const component = render(
		<Router>
			<Pokemon name={note.name } img={note.img} type={ note.types} id={note.ide}/>
		</Router>
	)

	component.getByText('Pikachu')

})



test("LANDING COMPONENT render welcome message", () => {
	const component = render(
		<Router>
		<LandingPage />
		</Router>
	);
	component.getByText('WELCOME')
});

test("LANDING COMPONENT render button", () => {
  	const { getByText } = render(
		<Router>
		<LandingPage />
		</Router>
  	);

    const button = getByText("GO!");
    expect(button).toBeTruthy()
});


test("Should return the initial state", () => {
  expect(rootReducer(undefined, {})).toEqual({
    pokemons: [],
    allPokemons: [],
    detail:[],
    typePokemon:[],
    load: true
  });
});


