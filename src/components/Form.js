import React, { Component } from "react";
import './style.css';
import axios from "axios";

const key = process.env.REACT_APP_API_KEY;

export default class Form extends Component {
    state = {
        From: "",
        To: "",
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`http://free.rome2rio.com/api/1.4/json/Search?key=${key}&oName=${this.state.From}&dName=${this.state.To}`);
        this.props.onSubmit(resp.data);
        console.log(this.state.From);
        console.log(this.state.To);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.From} onChange={event => this.setState({ From: event.target.value })} placeholder="From" required />
                <input type="text" value={this.state.To} onChange={event => this.setState({ To: event.target.value })} placeholder="To" required />


                <button>Go!</button>
            </form>
        );
    }
}


