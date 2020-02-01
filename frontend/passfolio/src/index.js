import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import './landing-page.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/font-awesome/css/font-awesome.min.css';
import './vendor/simple-line-icons/css/simple-line-icons.css';
import './landing-page.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
