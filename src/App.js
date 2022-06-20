import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './containers/HomePage'
import DetailsPokemon from './containers/DetailsPokemon'
import PokemonCreate from './containers/PokemonCreate'

function App() {
  	return (
		<div className="App">
	  		<BrowserRouter>
	  			<Routes>
      				<Route exact path="/" element={<HomePage />} />
      				<Route exact path="/pokemons/:id" element={<DetailsPokemon />} />
      				<Route exact path="/pokemons/create" element={<PokemonCreate />} />
			  	</Routes>
			</BrowserRouter>  		     
		</div>
	);
}

export default App;
