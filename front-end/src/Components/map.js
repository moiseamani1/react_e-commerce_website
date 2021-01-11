import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Button } from "semantic-ui-react";

class MyMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapStyles: {
        width: "100%",
        height: "100%"
      }
    };
  }

  render() {
    return (
      <div style={{ position: "relative", width: "100%", height: "30rem" }}>
        <Map
          google={this.props.google}
          zoom={14}
          style={this.state.mapStyles}
          initialCenter={{ lat: 45, lng: -75 }}
        >
          <Marker position={{ lat: 45, lng: -75 }} />
        </Map>
       


      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCM_1epZax911j5U16NquA50dXmtUzgpAg'
})(MyMap);