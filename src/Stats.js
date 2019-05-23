
import React from 'react'
import './style/App.css';
import headerLogo from "./pics/headerLogo.jpg"
import { isFlowType } from '@babel/types';
const axios = require('axios');

export default class Stats extends React.Component {

    state = {travelStats: null};
    
    componentDidMount = () => {
        this.getData().then(travelStats => this.setState({travelStats}));
    }

    getData = async () => {
        const response = await fetch("os2024back/webresources/travelentity/getall");
        console.log("response", response);
        if (!response.ok){ return null}
        const travelStats = await response.json();
        console.log("travelStats", travelStats);
        return travelStats;
        
    }
    
    findPopularStat = (statKey) => {
        if (!this.state.travelStats){
            return "n/a";
        }
        const stats = this.state.travelStats;
        console.log("travelStats", stats);        
        let list = [];
        let found = false;
        stats.forEach(statElement => {
            for (let i = 0; i < list.length && !found; i++){
                if (list[i].key === statElement[statKey]){
                    list[i].value++;
                    found = true;
                }
            }
            if (!found){
                list.push({key: statElement[statKey], value: 1});
            }
            found = false;
        });
        const sortedList = list.sort((a,b) => b.value-a.value);
        console.log("sortedOriginList", sortedList);
        return `${sortedList[0].key} (${sortedList[0].value})`;
    }

    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href="/" className="headerLogo"><img src={headerLogo} alt="2sweden logo" /></a>
                </header>

                <main className="statMain">
                    <h2>Total number of searches: {this.state.travelStats ? this.state.travelStats.length : "n/a"}</h2>
                    <h2>The most popular point of origin is: {this.findPopularStat("origin")}</h2>
                    <h2>The most popular destination is: {this.findPopularStat("destination")}</h2>
                </main>
            </div>

        )
    }
}