import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pages from './Pages';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'

import "./components/tablet.css"

    ReactDOM.render(<Pages />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
