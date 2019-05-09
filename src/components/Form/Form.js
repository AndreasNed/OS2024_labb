import React, { Component } from "react";
import '../style.css';
import DatePicker from "react-datepicker";
import rome2rio from "../../utils/rome2rio";

import "react-datepicker/dist/react-datepicker.css";

export default class Form extends Component {
    state = {
        from: "",
        to: "Stockholm",
        date: new Date(),
        showMe: true,
        suggestions: [],
        filterAir: false,
        filterRail: false,
        filterBus: false,
        filterCar: false,
    };

    handleOnChange = (event) => {
        const { name, checked } = event.target;
        this.setState({
            [name]: checked
        })
    }

    updateSearchInput = async (event) => {
        const string = event.target.value;
        this.setState({
            from: string,
            lastUpdate: Date.now()
        });

        await (new Promise(resolve => setTimeout(resolve, 200))); // basically sleep 200ms

        if (Date.now() - this.state.lastUpdate >= 200) {
            this.getSuggestions();
        }

    }

    getSuggestions = async () => {
        const suggestions = (await rome2rio.autocomplete(this.state.from)).places;
        console.log(suggestions);
        this.setState({
            suggestions: suggestions ? suggestions : [],
        });
    }

    setSuggestion = async (event) => {
        event.preventDefault();
        await this.setState({
            from: event.target.value,
        });
        this.getSuggestions();
        console.log(this.state.from);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const filters = { air: this.state.filterAir, rail: this.state.filterRail, bus: this.state.filterBus, car: this.state.filterCar }
        this.props.onSubmit(this.state.from, this.state.to, filters);
        console.log(this.state.from);
        console.log(this.state.to);
        this.toggler();
    }

    handleDateChange = (date) => {
        this.setState({ date: date })
    }

    toggler = () => {
        this.setState({
            showMe: !this.state.showMe,
            from: "",
            suggestions: []
        })
    }

    newSearch = () => {
        this.props.resetList();
        this.toggler();
    }

    render() {

        return (

            this.state.showMe ?
                <div>
                    <form onSubmit={this.handleSubmit}>

                        <input className="searchInput" type="text" onChange={this.updateSearchInput} placeholder="From" value={this.state.from} required />


                        <select className="select" onChange={event => this.setState({ to: event.target.value })}>
                            <option value="Stockholm">Stockholm</option>
                            <option value="Falun">Falun</option>
                            <option value="Åre">Åre</option>
                        </select>
                        <DatePicker className="datePicker"
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                            dateFormat="YYYY/MM/dd"
                        />
                        
                            <div>
                        <ul className="suggestUl">
                        {this.state.suggestions
                        .map(place => (
                           <li className= "suggestLi">
                               <button className="liButtons" value={place.canonicalName} onClick={this.setSuggestion} >{place.longName}</button>
                            </li>
                        ))}
                        </ul>
                        </div>
                        <div>
                            <button className="submitBtn">Go!</button>
                        </div>

                        <div className="checkboxes">        
                            <div className="checkbox1">
                                <label>
                                    <input type="checkbox"
                                    value={this.state.filterAir} 
                                    name="filterAir"
                                    onChange={this.handleOnChange} />
                                    Filter flight 
                                </label>
                            </div>

                            <div className="checkbox1">
                                <label>
                                    <input type="checkbox"
                                    value={this.state.filterRail} 
                                    name="filterRail"
                                    onChange={this.handleOnChange} />
                                    Filter trains
                                </label>
                            </div>

                            <div className="checkbox1">
                                <label>
                                    <input type="checkbox"
                                    value={this.state.filterBus} 
                                    name="filterBus"
                                    onChange={this.handleOnChange} />
                                    Filter bus 
                                </label>
                            </div>

                            <div className="checkbox1">
                                <label>
                                    <input type="checkbox"
                                    value={this.state.filterCar} 
                                    name="filterCar"
                                    onChange={this.handleOnChange} />
                                    Filter car 
                                </label>
                            </div>
                        </div>

                    </form>
                </div>

                :
                <div className="testdiv">
                    <div className="toggler2div">
                        <button className="toggler2" onClick={this.newSearch}>
                            <span>
                                New Search
                </span>

                        </button>
                    </div>
                </div>

        );
    }
}
