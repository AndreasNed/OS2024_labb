import React from 'react';
import Route from '../Route'


export default class RouteList extends React.Component {

    durationSort = (a, b) => a.totalDuration - b.totalDuration;
    distanceSort = (a, b) => a.distance - b.distance;
    priceSort = (a, b) => {

        let aPrice;
        let bPrice;
        console.log("a", a);
        console.log("b", b);
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
            sortFunction: "duration",
         };
    }

    handleOnChange = (event) => {
        const { name, checked } = event.target;
        this.setState({
            [name]: checked
        })
    }

    render(props) {
        const data = this.props.routeData;

        let activeSort = null;
        const sortState = this.state.sortFunction;
        console.log("Sort state", sortState);
        switch (sortState) {
            case 'duration':
                activeSort = this.durationSort;
                break;
            case "price":
                activeSort = this.priceSort;
                break;
            case "distance":
                activeSort = this.distanceSort;
                break;
            case "segments":
                activeSort = this.segmentsSort;
                break;
            default:
        }

        const sortedRoutes = [...data.routes].sort(activeSort);

        return (
                <div className="mainDivInfo">
                    <div className="routeProperties">
                        <div>From: {data.places[0].longName}</div>
                        <div>To: {data.places[1].longName}</div>

                        <select className="sortBy" onChange={event => this.setState({ sortFunction: event.target.value })}>
                        <option value="Duration">Sort by Duration</option>
                        <option value="Price">Sort by Price</option>
                        <option value="Distance">Sort by distance</option>
                        <option value="Segments">Sort by segments</option>
                    </select>
                    </div>




                    {data.routes.length ?
                        (<div className="routeDiv">
                            {sortedRoutes.map(element =>
                            <Route {...element} />
                        )}</div>)
                        : <div>Sorry, there are no transports for that journey.</div>}

                </div>
            
        )
    }
}
