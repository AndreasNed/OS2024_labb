import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form"
import Route from "./components/Route"
import logga from "./pics/projektlogga.png"
class App extends Component {
  state = {
    places: []
  };
       /*
        <div className ="ImageDiv">
          <img src={logga} alt ="logga" className="projektlogga"/>
          </div>  
       */



  addNewRoute = (routeData) => {
    this.setState(prevState => ({
      places: [...prevState.places, routeData]
    }));
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
            

          <Form onSubmit={this.addNewRoute} className="onSubmit" />
          <Route places={this.state.places}  className ="routePlaces"/>

          <div className="testModul"> detta är en test modul</div>
          <div className="testModul"> detta är en test modul</div>
          <div className="testModul"> detta är en test modul</div>
          <div className="testModul"> detta är en test modul</div>

          
      </div>
        );
      }
    }
    
    export default App;
