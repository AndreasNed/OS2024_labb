import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const myKey = process.env.REACT_APP_GOOGLE_API_KEY;

const myStyle = {
color : 'red',

}
 
let marker = <i class="fas fa-map-marker-alt fa-4x" style={myStyle}></i>
class SimpleMap extends Component {
  render(props) {
    const center ={
      lat: this.props.startCords.lat,
      lng: this.props.startCords.lng,
    }

    return (
      <div className="mapDiv">
        <GoogleMapReact
          bootstrapURLKeys={{ key: myKey }}
          defaultCenter={center}
          defaultZoom={6}

        >
          <AnyReactComponent
            lat={this.props.startCords.lat}
            lng={this.props.startCords.lng}
            text= {marker}
          />
          <AnyReactComponent
            lat={this.props.destinationCords.lat}
            lng={this.props.destinationCords.lng}
            text={marker}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;