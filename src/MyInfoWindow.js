import React from "react";
import PropTypes from "prop-types";
import { InfoWindow } from "google-maps-react";

class MyInfoWindow extends React.Component {
  static propTypes = {
    selectedPlace: PropTypes.object.isRequired,
    venue: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.onCloseInfoWindow = this.onCloseInfoWindow.bind(this);
  }

  // 关闭InfoWindow窗口
  onCloseInfoWindow = () => {
    this.props.unSelectPlace();
  };

  render() {
    const { selectedPlace, venue } = this.props;

    let photoUrl;

    if (venue && venue.bestPhoto) {
      photoUrl =
        venue.bestPhoto["prefix"] + "width200" + venue.bestPhoto["suffix"];
    }


    return (
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
        {venue && venue.price ? (
          <div>
            <h3>
              <a href={venue.canonicalUrl}>{venue.name}</a>
            </h3>
            <h1>{selectedPlace.name}</h1>
            <h4>Rating: {venue.rating}</h4>
            <h4>Price: {venue.price.message}</h4>
            <img src={photoUrl} alt={venue.name + " image"} />
          </div>
        ) : (
          "Content For This Place Not Found!"
        )}
      </InfoWindow>
    );
  }
}

export default MyInfoWindow;
