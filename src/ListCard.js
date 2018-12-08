import React from "react";

class ListCard extends React.Component {
  state = {
    query: ""
  };

  updateQuery = newQuery => {
    this.setState({ query: newQuery });
    this.props.onUpdateShowingPlaces(newQuery);
  };

  // clearQuery = () => {
  //   this.setState({ query: "" });
  // };

  clickItem = event => {
    this.props.onSelectPlace(event.target.dataset.id);
  };

  render() {
    const { showingPlaces, selectedPlace } = this.props;
    const { query } = this.state;

    return (
      <div
        className="card border-secondary"
        style={{ width: 300 }}
        id="item-list"
      >
        <div className="card-header">
          <h5>HongKong Restaurent</h5>
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Type To Filter"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
        </div>

        <ul className="list-group list-group-flush">
          {showingPlaces.map(place => (
            <li
              key={place.venueId}
              className={
                place.venueId === selectedPlace.venueId
                  ? "list-group-item active"
                  : "list-group-item"
              }
              data-id={place.venueId}
              onClick={this.clickItem}
            >
              {place.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListCard;
