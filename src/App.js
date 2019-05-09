import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form/Form"
import Route from "./components/Route"
import logga from "./pics/projektlogga.png"
import rome2rio from "./utils/rome2rio"
import Card from "./components/RouteList/RouteList"

const axios = require('axios');


class App extends Component {
  state = {
    routeData: null
  };

  searchNewRoute = async (from, to, filters) => {
    const routeData = await rome2rio.searchRoute(from, to, filters)
    this.setState(({
       routeData
    }));

  }

  resetList = () => {
    this.setState({
      routeData : null
    })
  }
 

  render() {
    const showResults = (this.state.routeData 
    ?  <Card routeData={this.state.routeData}  className ="routePlaces"/> 
    : null)
    return (
      <div className="App">
    
          <header className="ourHeader">
          <div className ="ImageDiv">
          <img src={logga} alt ="logga" className="projektlogga"/>
          </div >  
            <div className="headerList">
              <li className ="listItems"><a href="/"className="colorChanger">sök resor </a></li>
              <li className ="listItems"><a href="/about"className="colorChanger">läs om eventet </a></li>
              <li className ="listItems"><a href="/contact" className="colorChanger">läs om våra orter </a></li>
              <li className ="listItems"><a href="/contact"className="colorChanger">se rekommendationer</a></li>
        
            </div>
          </header>
          <div className ="formDiv">
          <Form onSubmit={this.searchNewRoute}
          resetList={this.resetList}
          className="onSubmit" />

          </div>
          
        {showResults}
          
      </div>
        );
      }
    }

export default App;
