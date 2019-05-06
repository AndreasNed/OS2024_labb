import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form"
import Route from "./components/Route"

class App extends Component {
  state = {
    places: []
  };

  addNewRoute = (routeData) => {
    this.setState(prevState => ({
      places: [...prevState.places, routeData]
    }));
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.addNewRoute}/>
        <Route places={this.state.places} />
      </div>
    );
  }
}

export default App;
