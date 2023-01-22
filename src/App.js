import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage';
import DetailsPokemon from './containers/DetailsPokemon';
import PokemonCreate from './containers/PokemonCreate';
import CreateItemHall from './containers/CreateItemHall';
import EditPokemon from './containers/EditPokemon';
import Alerts from './components/Alerts';
import NotFoundPage from './containers/NotFoundPage';

function App() {
	return (
		<div className="App">
  		<BrowserRouter>
        <Alerts/>  

  	  	<Routes>
        	<Route path="/" element={<HomePage />} />
        	<Route path="/detail/:name" element={<DetailsPokemon />} />
        	<Route path="/pokemons/create" element={<PokemonCreate />} />
        	<Route path="/hall/:name" element={<CreateItemHall />} />       			
        	<Route path="/pokemon/edit/:name" element={<EditPokemon />} />
          <Route path="*" element={<NotFoundPage />} />
  			</Routes>

			</BrowserRouter>  		     
		</div>
	);
}

export default App;
