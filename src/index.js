import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './assets/reset.css';
import './assets/globalStyles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>, document.getElementById('root')
);


reportWebVitals();