import React from 'react';
import Route from '../Route'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
  } from 'react-share';
import { Trans } from "@lingui/macro"


export default class RouteList extends React.Component {

    durationSort = (a, b) => a.totalDuration - b.totalDuration;
    distanceSort = (a, b) => a.distance - b.distance;
    priceSort = (a, b) => {
        let aPrice;
        let bPrice;
        if (a.indicativePrices) {
            aPrice = a.indicativePrices[0].priceLow;
            aPrice = aPrice ? aPrice : a.indicativePrices[0].price;
        }
        else {
            aPrice = 9999999;
        }

        if (b.indicativePrices) {
            bPrice = b.indicativePrices[0].priceLow;
            bPrice = bPrice ? bPrice : b.indicativePrices[0].price;
        }
        else {
            bPrice = 9999999;
        }
        return aPrice - bPrice;
    }
    segmentsSort = (a, b) => {
        return a.segments.length - b.segments.length;
    }

    constructor(props) {
        super();
        this.state = {
            sortFunction: "Duration",
        };
    }

    handleOnChange = (event) => {
        const { name, checked } = event.target;
        this.setState({
            [name]: checked
        })
    }

    render(props) {
        if (this.props.routeData){
            const data = this.props.routeData;
            let activeSort = null;
            const sortState = this.state.sortFunction;
            console.log("Routelist.js props", this.props.routeData.places);
            switch (sortState) {
                case 'Duration':
                    activeSort = this.durationSort;
                    break;
                case "Price":
                    activeSort = this.priceSort;
                    break;
                case "Distance":
                    activeSort = this.distanceSort;
                    break;
                case "Segments":
                    activeSort = this.segmentsSort;
                    break;
                default:
            }
            const sortedRoutes = [...data.routes].sort(activeSort);

    return (
        <div className="mainDivInfo">
            <div className="routeProperties">
                <Trans>
                <div className="shareDiv" >
                    <h4>Share search on social media: </h4>
                    <FacebookShareButton className="shareButton"  url={this.props.shareUrl} children={<FacebookIcon size={32} round={true} />} />
                    <TwitterShareButton className="shareButton" url={this.props.shareUrl} children={<TwitterIcon size={32} round={true} />} />
                </div>
                <div>From: {data.places[0].longName}</div>
                <div>To: {data.places[1].longName}</div>
                <select className="sortBy" onChange={event => this.setState({ sortFunction: event.target.value })}>
                    <option value="Duration">Sort by Duration</option>
                    <option value="Price">Sort by Price</option>
                    <option value="Distance">Sort by distance</option>
                    <option value="Segments">Sort by segments</option>
                </select>
                </Trans>
            </div>
            {data.routes.length ?
            (<div className="routeDiv">
            {sortedRoutes.map((element, index) =>
                <Route key={index} from = {data.places[0].longName} to = {data.places[1].longName} places = {this.props.routeData.places} {...element} />
                )}</div>)
                : <div>Sorry, there are no transports for that journey.</div>}
        </div>
            )
    }
        return null;
    }
}
