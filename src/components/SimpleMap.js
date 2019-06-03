import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const myKey = process.env.REACT_APP_GOOGLE_API_KEY;


const myStyle = {
 
  height: '80vh', // fel 
  width: '100%'

  
}





class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.33,
      lng: 17.95
    },
    zoom: 11
  };



  render() {

    return (
    <div style ={myStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: myKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.330617}
            lng={17.956425}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;