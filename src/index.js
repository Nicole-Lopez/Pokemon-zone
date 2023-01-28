import React from 'react';
import ReactDOM from 'react-dom';
import './assets/reset.css';
import './assets/globalStyles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store/index';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>, document.getElementById('root')
); 


reportWebVitals();