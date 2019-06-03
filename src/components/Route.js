import React from 'react';
import { Trans } from "@lingui/macro"
import Notifications, { notify } from 'react-notify-toast';
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
            console.log("We are here!")
            let price;
            const priceList = props.indicativePrices;
            if (priceList) {
                if (priceList[0].priceLow) { price = priceList[0].priceLow }
                else if (priceList[0].name) { price = priceList[0].price }
            } else { price = "Not available" }

            fetch(`http://localhost:8080/os2024back/webresources/savedtravelentity/${origin}/${destination}
        /${userId}/${distance}/${duration}/${price}/${transport}`)
            // "{origin}/{destination}/{userId}/{distance}/{duration}/{price}/{transport}")
            let myColor = { background: '#ffe991', text: " #0088bb" };
            notify.show(<Trans>Route is saved!</Trans>, "success", 5000) // make custom instead of success and add a forth parameter for color option
        }

        return (
            <div className="cardContainer">
                <Notifications options={{ top: '120px' }}/>
                <div><Trans>Transport</Trans>: {props.name}</div>
                <div><Trans>Distance</Trans>: {this.getKm(props.distance)}</div>
                <div><Trans>Total Duration</Trans>: {this.getHours(props.totalDuration)} {this.getMin(props.totalDuration)}</div>
                <div><Trans>Price</Trans>: {props.indicativePrices ?
                    props.indicativePrices.map(x => (
                        <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                            : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
                    )) : "Not available"}
                </div>
                    <Collapsible trigger="Start here">
                        <button onClick={putRouteToSavedList}><Trans>Add Route to saved list</Trans></button>
                        <p>This is the collapsible content. It can be any element or React component you like.</p>
                        <p>It can even be another Collapsible component. Check out the next section!</p>
                  <SimpleMap />
                    </Collapsible>
                </div>
            </div>
        )
    }
}