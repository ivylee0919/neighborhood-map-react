import React from "react";
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import escapeRegExp from "escape-string-regexp";
import sizeMe from 'react-sizeme';

import * as FoursquareAPI from "./FoursquareAPI";
import ListCard from "./ListCard";

export class MapContainer extends React.Component {
  static defaultProps = {
    center: {
      lat: 22.274208,
      lng: 114.174143
    },
    zoom: 14
  };

  static propTypes = {
    allPlaces: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showingPlaces: [], // 目前所有可显示的地点列表
      selectedPlace: {}, // 当前选中的地点
      venueData: {}, // 所在地点的详细信息
      mapWidth: {}   // 当前地图外框的宽度
    };

    this.updateShowingPlaces = this.updateShowingPlaces.bind(this);
    this.selectPlace = this.selectPlace.bind(this);
    this.unSelectPlace = this.unSelectPlace.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onCloseInfoWindow = this.onCloseInfoWindow.bind(this);
  }

  componentDidMount() {
    this.updateShowingPlaces("");
  }

  // 通过输入信息，更新当前显示的地点列表
  updateShowingPlaces = query => {
    let newShowingPlaces = this.state.showingPlaces;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      newShowingPlaces = this.props.allPlaces.filter(place =>
        match.test(place.name)
      );
    } else {
      newShowingPlaces = this.props.allPlaces;
    }

    if (!newShowingPlaces.includes(this.state.selectedPlace)) {
      this.setState({ selectedPlace: {} });
    }

    this.setState({ showingPlaces: newShowingPlaces });
  };

  // 选中特定id的地点，并向服务端请求详细信息
  selectPlace = placeId => {
    this.state.showingPlaces.forEach(place => {
      if (place.venueId === placeId) {
        this.setState({
          selectedPlace: place
        });
      }
    });

    FoursquareAPI.getVenueDetail(placeId).then(data => {
      this.setState({ venueData: data });
    });
  };

  // 取消当前选中的地点
  unSelectPlace = () => {
    this.setState({ selectedPlace: {}, venueData: {} });
  };

  // 点击Marker
  onMarkerClick = (props, marker, e) => {
    this.selectPlace(props.id);
  };

  // 关闭InfoWindow窗口
  onCloseInfoWindow = () => {
    this.unSelectPlace();
  };

  render() {
    const { showingPlaces, selectedPlace, venueData } = this.state;

    const { width } = this.props.size;

    let photoUrl;

    if (venueData && venueData.status === "success") {
      photoUrl =
        venueData.content.bestPhoto["prefix"] + "width200" + venueData.content.bestPhoto["suffix"];
    }

    let infoContent;

    if (!venueData) {
      infoContent = (<div>
        <h4>Loading Content...</h4>
      </div>)
    }
    else if (venueData.status === "success") {
      infoContent = (<div>
        <h3>
          <a href={venueData.content.canonicalUrl}>{venueData.content.name}</a>
        </h3>
        <h1>{selectedPlace.name}</h1>
        <h4>Rating: {venueData.content.rating}</h4>
        <h4>Price: {venueData.content.price.message}</h4>
        <img src={photoUrl} alt={venueData.content.name + " image"} />
      </div>)
    }
    else if (venueData.status === "error") {
      infoContent = (<div>
        <h3>Error Code {venueData.content}</h3>
        <h4>Content For This Place Not Found!</h4>
      </div>)
    }


    return (
      <Map
        google={this.props.google}
        zoom={this.props.zoom}
        initialCenter={this.props.center}
        mapTypeControl={false}
      >
        {showingPlaces.map(place => {
          let marker = (
            <Marker
              key={place.venueId}
              id={place.venueId}
              name={place.name}
              onClick={this.onMarkerClick}
              position={place.pos}
            />
          );

          return marker;
        })}
        <ListCard
          showingPlaces={this.state.showingPlaces}
          selectedPlace={this.state.selectedPlace}
          onUpdateShowingPlaces={this.updateShowingPlaces}
          onSelectPlace={this.selectPlace}
          mapWidth={width}
        />

        <InfoWindow
          position={
            selectedPlace
              ? selectedPlace.pos
              : {
                lat: 22.274208,
                lng: 114.174143
              }
          }
          visible={selectedPlace ? true : false}
          onClose={this.onCloseInfoWindow}
        >
          {infoContent}
        </InfoWindow>
      </Map>
    );
  }
}

export default sizeMe()(GoogleApiWrapper({
  apiKey: "AIzaSyD0s2IzInNw6599JGYFvgvDZ7s91cbavrM"
})(MapContainer));
