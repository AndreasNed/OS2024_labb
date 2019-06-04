import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const myKey = process.env.REACT_APP_GOOGLE_API_KEY;

const myStyle = {
  height: '80vh', // fel 
  width: '100%'
}

class SimpleMap extends Component {
/*   state = {
    center: {
      lat: this.props.startCords.lat,
      lng: this.props.startCords.lng
    },
    zoom: 3
  }; */


/*   componentDidMount = () => {
    this.setState({
      center: {
        lat: this.props.startCords.lat,
        lng: this.props.startCords.lng,
      }
    })
  } */

  render(props) {

    const center ={
      lat: this.props.startCords.lat,
      lng: this.props.startCords.lng,
    }

    return (
      <div style={myStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: myKey }}
          defaultCenter={center}
          defaultZoom={6}

        >
          <AnyReactComponent
            lat={this.props.startCords.lat}
            lng={this.props.startCords.lng}
            text="START"
          />
          <AnyReactComponent
            lat={this.props.destinationCords.lat}
            lng={this.props.destinationCords.lng}
            text="FINISH"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;