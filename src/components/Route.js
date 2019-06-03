import React from 'react';
import { Trans } from "@lingui/macro"
import Modal from "../components/Modal";
import SimpleMap from './SimpleMap';
import Collapsible from 'react-collapsible';
import Notifications, { notify } from 'react-notify-toast';

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

    toggleCollapsible = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }


    render() {
        const props = this.props;
        const origin = props.from;
        const destination = props.to;
        const userId = localStorage.getItem("userId");
        const distance = this.getKm(props.distance);
        const duration = this.getHours(props.totalDuration) + " " + this.getMin(props.totalDuration);
        const transport = props.name;
        const hover = { color: '#2196fc' };
        const styleBlue = {
            color: '#0088bb'
        };
        let arrowDown = <i class="fas fa-arrow-down fa-5x" style={styleBlue}></i>
        let arrowUp = <i className="arrowUp" class="fas fa-arrow-up fa-5x" style={styleBlue}></i>
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

                <Notifications options={{ top: '120px' }} />

                <div className="transport"><Trans>Transport</Trans>: {props.name}</div>
                <div className="distance"><Trans>Distance</Trans>: {this.getKm(props.distance)}</div>
                <div className="duration"><Trans>Total Duration</Trans>: {this.getHours(props.totalDuration)} {this.getMin(props.totalDuration)}</div>
                <div className="price"><Trans>Price</Trans>: {props.indicativePrices ?
                    props.indicativePrices.map(x => (
                        <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                            : x.name ? x.name + " " + x.price : x.price} {x.currency} </span>
                    )) : "Not available"}
                </div>

                <div classname="spanner">
                <Collapsible trigger={arrowDown} className="colapseTrigger" triggerWhenOpen={arrowUp} onMouseEnter={hover}>
                    <div className="collpaseDiv">¨
                        <button classname="saveButton" onClick={putRouteToSavedList}><Trans>Add Route to saved list</Trans></button>

                        <div className="mapDiv"> <SimpleMap /></div>
                    </div>
                    </Collapsible>
              
                </div>
            </div>
        )
    }
}


//<Collapsible trigger={arrowDown} className="colapseTrigger" triggerWhenOpen={arrowUp} onMouseEnter={hover}

//</Collapsible>