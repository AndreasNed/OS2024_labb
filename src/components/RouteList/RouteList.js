import React from 'react';


class RouteList extends React.Component {

    render(props) {
        const data = this.props.routeData;

        console.log("place in Card")
        console.log(data);

        function getHours(min) {
            return Math.trunc(min / 60) + "h";
        }

        function getMin(min) {
            return min % 60 + "min";
        }

        function getKm(distance){
            return Math.trunc(distance) + "km";
        }
        
        const routeSegment = data.routes.length ?
             (<div className="allRoutes">All transports: {data.routes.map(element => (
                <div className="routeSegment"><br/>
                    <div>Transport type: {element.name}</div>
                    <div>Distance: {getKm(element.distance)}</div>
                    <div>Total Duration: {getHours(element.totalDuration)} {getMin(element.totalDuration)}</div>
                    <div>Price: {element.indicativePrices ? element.indicativePrices.map(x => (
                        <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                        : x.name ? x.name + " " + x.price : x.price} {x.currency} </span> 
                    )) : "Not available"}</div>
                </div>
            ))}</div>)
            : <div>Sorry, there's no transports for that journey</div>
        

        return (
            <div>
                <div className="info" data-test="info">
                    <div>From: {data.places[0].longName}</div>
                    <div>To: {data.places[1].longName}</div>

                    {routeSegment}

                </div>
            </div>
        )
    }
}

export default RouteList;