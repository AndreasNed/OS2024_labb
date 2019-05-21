import React from 'react';


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
        <div className="mainContainer">
            <div className="theCard">

                <div className="frontCard">front of card
                    <div>Transport type: {props.name}</div>
                    <div>Distance: {this.getKm(props.distance)}</div>
                    <div>Price: {props.indicativePrices ? 
                        props.indicativePrices.map(x => (
                            <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                            : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
                    )) : "Not available"}
                    </div>
                    <br/>
                </div>

                <div className="backCard">back of card
                    <div>Transport type: {props.name}</div>
                    <div>Distance: {this.getKm(props.distance)}</div>
                    <div>Total Duration: {this.getHours(props.totalDuration)} {this.getMin(props.totalDuration)}</div>
                    <div>Price: {props.indicativePrices ? 
                        props.indicativePrices.map(x => (
                            <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                            : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
                    )) : "Not available"}
                    </div>
                    <br/>
                </div>

            </div>
        </div>

    )}
}