import React, {Component} from "react";
import "./tablet.css";
import './style.css';


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

