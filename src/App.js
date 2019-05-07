import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form"
import Route from "./components/Route"
import logga from "./pics/projektlogga.png"
import rome2rio from "./utils/rome2rio"

const axios = require('axios');


class App extends Component {
  state = {
    places: []
  };

  searchNewRoute = async (from, to) => {
    const routeData = await rome2rio.searchRoute(from, to)
    this.setState(prevState => ({
      places: [...prevState.places, routeData]
    }));

  }

  resetList = () => {
    this.setState({
      places : []
    })
  }

  render() {
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

          <Form onSubmit={this.searchNewRoute}
          resetList={this.resetList}
          className="onSubmit" />
          <Route places={this.state.places}  className ="routePlaces"/>

          
          
      </div>
        );
      }
    }

export default App;
