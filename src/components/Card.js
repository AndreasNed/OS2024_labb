import React from 'react';


class Card extends React.Component {


    render(props) {
        const place = this.props;
        const price = place.routes[0].indicativePrices[0].price;

        console.log("place in Card")
        console.log(place);

        function getHours(min) {
            return Math.trunc(min / 60) + "h";
        }

        function getMin(min) {
            return min % 60 + "min";
        }

        function getKm(distance){
            return Math.trunc(distance) + "km";
        }

        return (
            <div>
                <div className="info">
                    <div>From: {place.places[0].longName}</div>
                    <div>To: {place.places[1].longName}</div>

                    <div className="allRoutes">All transports: {place.routes.map(element => (
                        <div className="routeSegment"><br></br>
                            Transport type: {element.name} <br></br>
                            Distance: {getKm(element.distance)} <br></br>
                            Total Duration: {getHours(element.totalDuration)} {getMin(element.totalDuration)} <br></br>
                            Price: {element.indicativePrices ? element.indicativePrices.map(x => (

                                <span>{x.priceLow ? x.priceLow + " - " + x.priceHigh
                                : x.name ? x.name + " " + x.price : x.price} {x.currency} </span> 
                            )) : "Not available"}
                        </div>
                    ))}</div>

                </div>
            </div>
        )
    }
}

export default Card;