import React, { Component } from "react";
import MapContainer from "./MapContainer";

import "./css/style.css";
import "./css/bootstrap.css";

class App extends Component {
  static defaultProps = {
    places: [
      {
        name: "Samsen",
        pos: {
          lat: 22.274208,
          lng: 114.174143
        },
        venueId: "57beeaa5498ebfb7b03dfb94"
      },
      {
        name: "Din Tai Fung",
        pos: {
          lat: 22.297583,
          lng: 114.169616
        },
        venueId: "4b0fbed6f964a520896423e3"
      },
      {
        name: "Little Creatures",
        pos: {
          lat: 22.283944,
          lng: 114.128416
        },
        venueId: "57889cad498eb4b2f13f5f05"
      },
      {
        name: "Okra Hong Kong",
        pos: {
          lat: 22.286209,
          lng: 114.146072
        },
        venueId: "567e06ac498e639d1cb937ae"
      },
      {
        name: "Mott 32",
        pos: {
          lat: 22.280449,
          lng: 114.159073
        },
        venueId: "5305caeb498e391fd4b9caf0"
      },
      {
        name: "New Punjab Club",
        pos: {
          lat: 22.279969,
          lng: 114.155199
        },
        venueId: "59ba622f91eaca086340cff3"
      },
      {
        name: "Yardbird",
        pos: {
          lat: 22.287247,
          lng: 114.149081
        },
        venueId: "5a37bf6b67a9fe7d94f0cfb5"
      },
      {
        name: "Ronin",
        pos: {
          lat: 22.28447,
          lng: 114.152416
        },
        venueId: "51262240e4b0a34a7c5f7c78"
      },
      {
        name: "Pici",
        pos: {
          lat: 22.276109,
          lng: 114.168952
        },
        venueId: "588edacd6cda1c0dbf6ce538"
      },
      {
        name: "Zuma",
        pos: {
          lat: 22.280963,
          lng: 114.158192
        },
        venueId: "4b0e380af964a520115623e3"
      },
      {
        name: "N.O.T. Specialty Coffee",
        pos: {
          lat: 22.279658,
          lng: 114.178872
        },
        venueId: "52e2080c498e192282ed1003"
      }

    ]
  };

  render() {
    return (
      <div className="App">
        <MapContainer
          allPlaces={this.props.places}
        />
      </div>
    );
  }
}

export default App;
