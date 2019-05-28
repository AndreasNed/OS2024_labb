import React from 'react';
import { Trans } from "@lingui/macro"
import Modal from "../components/Modal"


export default class Route extends React.Component {



    getHours(min) {
        return Math.trunc(min / 60) + "h";
    }

    getMin(min) {
        return min % 60 + "min";
    }

    getKm(distance) {
        return Math.trunc(distance) + "km";
    }


    openTripDetails = () => {
        document.getElementById('tripDetails').addEventListener('click', function () {
            document.querySelector('.background-modal').style.display = 'flex';
        })
    }

    render() {
        const props = this.props;
        const shortid = require('shortid');

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

                    <button onClick={
                        fetch(`http://localhost:8080/os2024back/webresources/savedtravelentity/${props.from}/${props.to}/${localStorage.getItem("userId")}
               /${this.getKm(props.distance)}/${this.getHours(props.totalDuration) + this.getMin(props.totalDuration)}/${
                this.props.indicativePrices ?
                    props.indicativePrices.map(x => (
                        <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                            : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
                    )) : "Not available"
            }/${props.name}`)

                                    // "{origin}/{destination}/{userId}/{distance}/{duration}/{price}/{transport}")
                    } > Add Route to saved list </button>

                </div>

                <Modal
                    to={props.to}
                    from={props.from}
                    transport={props.name}
                    distance={this.getKm(props.distance)}
                    durationH={this.getHours(props.totalDuration)}
                    durationM={this.getMin(props.totalDuration)}
                    pricing={
                        this.props.indicativePrices ?
                            props.indicativePrices.map(x => (
                                <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                                    : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
                            )) : "Not available"
                    }

                />
            </div>
        )
    }
}