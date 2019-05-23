import React from 'react';
import { Trans } from "@lingui/macro"
import {BrowserRouter, Route} from 'react-router-dom'
import App from './App'
import Stats from './Stats';

export default class Pages extends React.Component{

    render(){
         return (<BrowserRouter>
            <Route exact path="/stats" component={Stats}/>
            <Route path="/" component={App}/>
        </BrowserRouter>
         )
    }        
}