import React, { Component } from "react";
import '../../style/App.css';
import './form.css'
import '../mobile.css'
import DatePicker from "react-datepicker";
import rome2rio from "../../utils/rome2rio";
import {Trans} from "@lingui/macro"
import "react-datepicker/dist/react-datepicker.css";

export default class Form extends Component {
    state = {
        from: "",
        to: "Stockholm",
        currency: "USD",
        date: new Date(),
        showMe: true,
        suggestions: [],
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
        this.props.onSubmit(this.state.from, this.state.to, this.state.currency);
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
            <div className="mainDivForm">
                <form onSubmit={this.handleSubmit}>
                    <input className="searchInput" list="data" type="text" onChange={this.updateSearchInput} placeholder="From" value={this.state.from} required />
                    <datalist id="data">
                        {
                            this.state.suggestions
                                .map((place, key) =>
                                    <option key={key} value={place.longName} />
                                )
                        }
                    </datalist>

                    <select className="selectDestination" onChange={event => this.setState({ to: event.target.value })}>
                        <option value="Stockholm">Stockholm</option>
                        <option value="Falun">Falun</option>
                        <option value="Åre">Åre</option>
                    </select>
                    <DatePicker className="datePicker"
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        dateFormat="YYYY/MM/dd"
                    />
  
                    <button className="submitButton"><Trans>Go!</Trans></button>
                    <div className="currencyDiv">
                    <select className="currency" onChange={event => this.setState({ currency: event.target.value })}>
                        <option value="USD">USD</option>
                        <option value="SEK">SEK</option>
                        <option value="EUR">EUR</option>
                    </select>
                    </div>
                    {this.props.filterButtons}
                </form>
            </div >
        );
    }
}
