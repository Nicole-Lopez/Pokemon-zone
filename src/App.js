import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './containers/LandingPage'
import HomePage from './containers/HomePage'
import DetailsPokemon from './containers/DetailsPokemon'
import PokemonCreate from './containers/PokemonCreate'

function App() {
  	return (

		<div className="App">
	  		<BrowserRouter>
	  			<Routes>
		  			<Route exact path='/' element={<LandingPage />} />
      				<Route path="/pokemons" element={<HomePage />} />
      				<Route path="/pokemons/:id" element={<DetailsPokemon />} />
      				<Route path="/pokemons/create" element={<PokemonCreate />} />
			  	</Routes>
			</BrowserRouter>  		     
		</div>
	);
}

export default App;
