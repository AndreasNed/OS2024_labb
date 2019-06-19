import React, {Component} from "react";
import './style.css';

/*
@feedback
Prefer to use of functional components when a component
only return jsx-elements and have no need for state.
*/

export default class Myheader extends Component {
  render() {
    return (
      <header className = "MyHeaderComponent">
        <ul>
          <li><a href="#example">Sök resor</a></li>
          <li><a href="#example">Läs om eventet</a></li>
          <li><a href="#example">Läs om våra orter</a></li>
          <li><a href="#example">Se rekomendationer</a></li>
        </ul>
      </header>
    );
  }
}

