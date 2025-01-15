import { createRoot } from 'react-dom/client';
import domReady from '@wordpress/dom-ready';
import App from './app/App';

import './assets/styles/bundler.css';


domReady(() => {
	createRoot(document.getElementById('root')!).render(<App />);
});