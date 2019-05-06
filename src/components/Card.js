import React from 'react';


class Card extends React.Component {

    render(props) {
        const place = this.props;
        console.log("place in Card")
        console.log(place);
        return (
            <div>
                <div className="info">
                    <div>From: {place.places[0].longName}</div>
                    <div>To: {place.places[1].longName}</div>
                    
                    <div>Transport type: {place.routes[0].name}</div>
                    <div>distance: {place.routes[0].distance}</div>
                </div>
            </div>
        )
    }
}

export default Card;