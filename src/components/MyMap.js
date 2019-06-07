import React from "react";
import { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline
} from "react-google-maps";
import { lifecycle } from "recompose";
import {
  IoIosAirplane,
  IoIosCar,
  IoMdTrain,
  IoIosWalk,
  IoIosBus,
  IoMdBug
} from "react-icons/io";

const {
  MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const decodePolyline = require("decode-google-map-polyline");

function createPathMapping(segmentData, places) {
  let pathMapping = segmentData.map(array => {
    var path = array.path;
    if (path === undefined) {
      path = [
        {
          lat: places[array.depPlace].lat,
          lng: places[array.depPlace].lng
        },
        {
          lat: places[array.arrPlace].lat,
          lng: places[array.arrPlace].lng
        }
      ];
    } else {
      path = decodePolyline(path);
    }
    return (
      <Polyline
        path={path}
        options={{ strokeColor:'#006699', strokeWeight: 3 }}
        visible={true}
      />
    );
  });

  return pathMapping;
}

function createMarkerMapping(segmentData, places) {
  let markerMapping = segmentData.map(array => {
    function getIcon(transport) {
      switch (transport) {
        case "Walk":
          return  <IoIosWalk />;
        case "Bus":
          return <IoIosBus />;
        case "Plane":
          return <IoIosAirplane />;
        case "Train":
          return <IoMdTrain />;
        case "Car":
          return <IoIosCar />;
        default:
          return <IoMdBug />;
      }
    }

    // Hack to remove google-maps marker.
    var removeMarker = new window.google.maps.MarkerImage(
      <i class="fas fa-map-marker-alt"></i>, // url
      null, // size
      null, // origin
      null, // anchor
      new window.google.maps.Size(32, 32)
    ); // scaledSize

    return (
      <MarkerWithLabel
        position={{
          lat: places[array.depPlace].lat,
          lng: places[array.depPlace].lng
        }}
        icon={removeMarker}
        labelAnchor={new window.google.maps.Point(0, 0)}
        labelStyle={{
          backgroundColor: "NONE",
          color: "NONE",
          fontSize: "0px",
          border: "solid #ffcc00 1px",
          borderRadius: "5px",
          padding: "0"
        }}
      >
        <div>
          {getIcon(array.transport)} {array.from}
        </div>
      </MarkerWithLabel>
    );
  });
  return markerMapping;
}

class MapContainer extends Component {
  render() {
    return (
        <div className="mapDiv">
      <MapWithAMarkerExtended
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
          process.env.REACT_APP_GOOGLE_API_KEY
        }&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        segmentData={this.props.segmentData}
        places={this.props.places}
      />
      </div>
    );
  }
}

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap ref={props.zoomToMarkers}>
      {createMarkerMapping(props.segmentData, props.places)}
      {createPathMapping(props.segmentData, props.places)}
    </GoogleMap>
    
  ))
);

const MapWithAMarkerExtended = lifecycle({
  componentWillReceiveProps() {
    let coords = [
      {
        lng: this.props.places[0].lng,
        lat: this.props.places[0].lat
      },
      {
        lng: this.props.places[1].lng,
        lat: this.props.places[1].lat
      }
    ];
    this.setState({
      zoomToMarkers: map => {
        const bounds = new window.google.maps.LatLngBounds();
        coords.forEach(coord => {
          bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
        });
        if (map != null) {
          map.fitBounds(bounds);
        }
      }
    });
  }
})(MapWithAMarker);

export default MapContainer;