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

    render(){
        
        const props = this.props;
        return (
        <div className="routeSegment">
            <div><Trans>Transport type: </Trans> {props.name}</div>
            <div><Trans>Distance: </Trans> {this.getKm(props.distance)}</div>
            <div><Trans>Total Duration: </Trans> {this.getHours(props.totalDuration)} {this.getMin(props.totalDuration)}</div>
            <div><Trans>Price: </Trans> {props.indicativePrices ? 
                props.indicativePrices.map(x => (
                    <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                    : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
            )) : "Not available"}
            </div>
            <br/>
        </div>
    )}
}