import React from 'react';
import { Trans } from "@lingui/macro"

export default class Route extends React.Component{

    getHours(min) {
        return Math.trunc(min / 60) + "h";
    }

    getMin(min) {
        return min % 60 + "min";
    }

    getKm(distance){
        return Math.trunc(distance) + "km";
    }


    openTripDetails = () => {
        document.getElementById('tripDetails').addEventListener('click', function() {
          document.querySelector('.background-modal').style.display = 'flex';
        })
    }

    render(){        
        const props = this.props;
        return (
            
        <div className="cardContainer">
                    <div>Transport: {props.name}</div>
                    <div>Distance: {this.getKm(props.distance)}</div>
                    <div>Total Duration: {this.getHours(props.totalDuration)} {this.getMin(props.totalDuration)}</div>
                    <div>Price: {props.indicativePrices ? 
                        props.indicativePrices.map(x => (
                            <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                            : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
                    )) : "Not available"}

            </div>
            <button id="tripDetails" onClick={this.openTripDetails}>Details</button>            

        </div>
        

    )}
}