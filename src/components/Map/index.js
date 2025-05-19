import React, {Component} from "react";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "20em",
  position: "relative",
};

export class MapContainer extends Component {

  render() {
    const {initialCenter} = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={initialCenter ? initialCenter : {
          lat: -1.2884,
          lng: 36.8233,
        }}
      >
        <Marker name={'Current location'}/>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD-Sgkl8i39IseExgaEdIwWigfqm0OpfAs",
})(MapContainer);
