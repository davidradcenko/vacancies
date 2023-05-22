import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {HashRouter as Router} from "react-router-dom";
import { store } from './src/store/store'


import './index.css'
import './IndexModule.css'
import App from './src/App';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<Router>
			<App />
			</Router>
	</Provider>
)
