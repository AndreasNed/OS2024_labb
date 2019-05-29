import React from 'react';
import { Trans } from "@lingui/macro"
import Modal from "../components/Modal";
import SimpleMap from './SimpleMap';
import Collapsible from 'react-collapsible';



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
        const origin = props.from;
        const destination = props.to;
        const userId = localStorage.getItem("userId");
        const distance = this.getKm(props.distance);
        const duration = this.getHours(props.totalDuration) + " " + this.getMin(props.totalDuration);
        const transport = props.name;

        function putRouteToSavedList() {
            let price;
            const priceList = props.indicativePrices;
            if (priceList) {
                if (priceList[0].priceLow) { price = priceList[0].priceLow }
                else if (priceList[0].name) { price = priceList[0].price }
            } else { price = "Not available" }

            fetch(`http://localhost:8080/os2024back/webresources/savedtravelentity/${origin}/${destination}
        /${userId}/${distance}/${duration}/${price}/${transport}`)
            // "{origin}/{destination}/{userId}/{distance}/{duration}/{price}/{transport}")
        }

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

                    <Collapsible trigger="Start here">
                        <button onClick={putRouteToSavedList}> Add Route to saved list </button>
                        <p>This is the collapsible content. It can be any element or React component you like.</p>
                        <p>It can even be another Collapsible component. Check out the next section!</p>
                                    
                  <SimpleMap />
                    </Collapsible>





                </div>
                

                {/*                 <Modal
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
                /> */}


            </div>


        )
    }
}