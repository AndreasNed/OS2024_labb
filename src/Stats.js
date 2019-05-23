
import React from 'react'
import './style/App.css';
import headerLogo from "./pics/headerLogo.png"
const axios = require('axios');

export default class Stats extends React.Component {

    state = {travelStats: null};
    
    componentDidMount = async () => {

        const response = await fetch("http://localhost:8080/os2024back/webresources/travelentity/getall", { mode: 'no-cors', });
        console.log("response", response);
        const travelStats = response.json();
        console.log("travelStats", travelStats);
        this.setState({travelStats});

    }
    
    findPopularOrigin = () => {
        if (!this.state.travelStats){
            return "n/a";
        }
        const stats = this.state.travelStats;
        console.log("travelStats", stats);        
        let list = [];
        stats.forEach(statElement => {
            for (let i = 0; i < list.length; i++){
                if (list[i].key === statElement.origin){
                    list[i].value++;
                    i = list.length;
                }
                else if (i+1 === list.length){
                    list.append({key: statElement.origin, value: 0});
                }
            }
            console.log("originTable", list);

        })

    }

    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href="/" className="headerLogo"><img src={headerLogo} alt="2sweden logo" /></a>
                </header>

                <main>
                    <h2>The most popular point of origin is: {this.findPopularOrigin()}</h2>
                </main>
            </div>

        )
    }
}