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

  searchNewRoute = async (from, to, filters) => {
    const routeData = await rome2rio.searchRoute(from, to, filters)
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
      <div>
        
      <header>
        <a href="/" className="navLogo"><img src={logga}/></a>
        <a href="/" className="nav1">Sök resor</a>
        <a href="/" className="nav2">Läs om eventet</a>
        <a href="/" className="nav3">Läs om våra orter</a>
        <a href="/" className="nav4">Se rekommendationer</a>
      </header>

      <main>
          <Form onSubmit={this.searchNewRoute}
          resetList={this.resetList}
          className="onSubmit" />
          <Route places={this.state.places}  className ="routePlaces"/>
      </main>

      <footer>
        Hej
      </footer>
          
      </div>
        );
      }
    }

export default App;
