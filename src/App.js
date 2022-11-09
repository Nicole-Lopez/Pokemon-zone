import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './containers/HomePage'
import DetailsPokemon from './containers/DetailsPokemon'
import PokemonCreate from './containers/PokemonCreate'
import Fantasma from './containers/Fantasma'
import CreateItemHall from './containers/CreateItemHall'


function App() {
  	return (
		<div className="App">
	  		<BrowserRouter>
	  			<Routes>
      				<Route exact path="/" element={<HomePage />} />
      				<Route exact path="/detail/:name" element={<DetailsPokemon />} />
      				<Route exact path="/pokemons/create" element={<PokemonCreate />} />
      				<Route exact path="/pokemons/ops" element={<Fantasma />} />

      				<Route exact path="/hall/:name" element={<CreateItemHall />} />

			  	</Routes>
			</BrowserRouter>  		     
		</div>
	);
}

export default App;
