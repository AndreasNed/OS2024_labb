import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form/Form"
import Route from "./components/Route"
import logga from "./pics/projektlogga.png"
import rome2rio from "./utils/rome2rio"
import RouteList from "./components/RouteList/RouteList"


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
    const showResults = this.state.routeData 
    ?  <RouteList routeData={this.state.routeData}  className ="routePlaces"/> 
    : null

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
        <ul className="foot1">
          <a href="/">Kontakt</a>
          <a href="/">Om oss</a>
        </ul> 
        <ul className="foot2"> 
          <a href="https://bit.ly/2vOZHyk">Årstavägen 19</a>
          <a href="/">08-557 683 53</a>
          </ul>
        </footer> 
          
      </div>
        );
      }
    }

export default App;
