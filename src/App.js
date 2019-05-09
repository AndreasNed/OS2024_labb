import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form"
import Route from "./components/Route"
import logga from "./pics/projektlogga.png"
import rome2rio from "./utils/rome2rio"
import Card from "./components/Card"

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
    const showResults = this.state.routeData ?  <Card routeData={this.state.routeData}  className ="routePlaces"/> : null
    return (
      <div className="App">
    
        <header>
          <a href="/" className="navLogo"><img src={logga}/></a>
        </header>

        <nav>
          <a href="/" className="nav1">Sök resor</a>
          <a href="/" className="nav2">Läs om eventet</a>
          <a href="/" className="nav3">Läs om våra orter</a>
          <a href="/" className="nav4">Se rekommendationer</a>
        </nav>
        
        <main>
          <Form onSubmit={this.searchNewRoute}
          resetList={this.resetList}
          className="onSubmit" />
        </main>
          
        {showResults}

        <footer className="footerContent">
        
        </footer> 
          
          
      </div>
        );
      }
    }

export default App;
