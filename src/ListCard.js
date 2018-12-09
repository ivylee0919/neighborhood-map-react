import React from "react";

class ListCard extends React.Component {
  state = {
    query: "",
    showListCard: true // 控制是否显示列表
  };

  // 根据当前设备的屏幕宽度，设定是否显示 list
  // 刷新页面时才会检测当前设备的屏幕宽度，动态缩小页面不能更新
  updateIsShow () {
    if (this.props.mapWidth < 700) {
      this.setState({ showListCard: false });
    }
  }

  componentDidMount() {
    this.updateIsShow();
  }

  updateQuery = newQuery => {
    this.setState({ query: newQuery });
    this.props.onUpdateShowingPlaces(newQuery);
  };

  // clearQuery = () => {
  //   this.setState({ query: "" });
  // };

  hideListCard = event => {
    if (this.state.showListCard){
      this.setState({ showListCard: false });
    }
    else{
      this.setState({ showListCard: true });
    }
  }

  clickItem = event => {
    this.props.onSelectPlace(event.target.dataset.id);
    this.hideListCard(); //选中条目后，关闭条目列表
  };

  render() {
    const { showingPlaces, selectedPlace } = this.props;
    const { query } = this.state;

    // console.log(this.props.mapWidth < 700);

    return (
      <div
        className="card border-secondary"
        id="item-list">

        <div className="card-header">
          <button className="btn btn-info"
            onClick={this.hideListCard}>{this.state.showListCard ? "—" : "十"}</button>
          <h5>HongKong Restaurent</h5>
        </div>
        <div
          className={this.state.showListCard ? "card-body" : "hidden"} // 根据当前的showListCard值控制是否显示
          >
          <input
            type="text"
            className="form-control"
            placeholder="Type To Filter"
            aria-label="Filter text input box" //为 input 创建 label
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
        </div>
        <ul className={this.state.showListCard ? "list-group list-group-flush" : "hidden"}>
          {showingPlaces.map(place => (
            <li key={place.venueId}>
              <button
                className={
                  place.venueId === selectedPlace.venueId
                    ? "list-group-item active"
                    : "list-group-item"
                }
                data-id={place.venueId}
                onClick={this.clickItem}>{place.name}</button>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default ListCard;
