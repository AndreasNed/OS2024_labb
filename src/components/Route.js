import React from 'react';
import Card from "./Card.js"


function Route(props) {

    console.log(props);

    return (
        <div>
            {props.places.map(place => <Card {...place} />)}
        </div>

    )
}

export default Route;