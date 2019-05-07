import React, { Component } from "react";
import './style.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import rome2rio from "../utils/rome2rio";

import "react-datepicker/dist/react-datepicker.css";

export default class Form extends Component {
    state = {
        from: "",
        to: "Stockholm",
        date: new Date(),
        showMe: true,
        suggestions: []
    };

    updateSearchInput = async (event) => {
        const string = event.target.value;
        this.setState({
            from: string, 
            lastUpdate: Date.now() 
        });

        await (new Promise(resolve => setTimeout(resolve, 1000))); // basically sleep 100ms
        
        if (Date.now()-this.state.lastUpdate>=1000){
            const suggestions = (await rome2rio.autocomplete(string)).places;
            console.log(suggestions);
            this.setState({
                suggestions: suggestions ? suggestions : [],
            }); 
        }
          
    }

    setSuggestion = event => {
        event.preventDefault();
        this.setState({from: event.target.value});
        console.log(this.state.from);
        this.render();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.from, this.state.to);
        console.log(this.state.from);
        console.log(this.state.to);
        this.toggler();
    }

    handleDateChange = (date) => {
        this.setState({ date: date })

    }
   toggler = () => {   
       this.setState({
    showMe: !this.state.showMe })}
            // TODO CLEAR SEARCH HISTORY whhen pressed 

    render() {

        return (

            this.state.showMe ?
                <div>
                    <form onSubmit={this.handleSubmit}>

                        <input className="searchInput From" type="text" onChange={this.updateSearchInput} placeholder="From" value={this.state.from} required />
                        <ul>
                        {this.state.suggestions.map(place => (
                           <li>
                               <button value={place.canonicalName} onClick={this.setSuggestion} >{place.longName}</button>
                            </li>
                        ))}
                        </ul>
                        <select onChange={event => this.setState({ to: event.target.value })}>
                            <option value="Stockholm">Stockholm</option>
                            <option value="Falun">Falun</option>
                            <option value="Åre">Åre</option>
                        </select>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                            dateFormat="YYYY/MM/dd"
                        />
                        <button className="searchInput submitBtn">Go!</button>
                    </form>

                </div>
                : <button className ="toggler2" onClick = {this.toggler}>
                click me
                
                </button>
                
        );
    }
}


