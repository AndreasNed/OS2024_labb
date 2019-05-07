import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form"
import Route from "./components/Route"
import logga from "./pics/projektlogga.png"

const axios = require('axios');

const key = process.env.REACT_APP_ROME_2_RIO_API_KEY;

class App extends Component {
  state = {
    places: []
  };

  searchNewRoute = async (from, to) => {
    const resp = await axios.get(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${from}&dName=${to}`);
    const routeData = resp.data;
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
              <li className ="listItems"><a href="/contact"className="colorChanger">se rekommendat-ioner</a></li>
        
            </div>
          </header>

          <Form onSubmit={this.searchNewRoute}
          resetList={this.resetList}
          className="onSubmit" />
          <Route places={this.state.places}  className ="routePlaces"/>

          <div className="testModul"> <br/><br/><br/><br/> </div>
          
      </div>
        );
      }
    }

export default App;
