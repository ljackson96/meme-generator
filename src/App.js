import React, { Component } from "react";
import Gallery from "./Gallery";
// import Generator from "./Generator";
import TempGen from "./TempGen";

export default class App extends Component {
  state = {
    images: [],
    selected: null,
    selectedImg: [],
  };

  handleImgClick = (e) => {
    this.setState({
      selectedImg: this.state.images.find(i => i.id === e.target.id),
    });
    this.toggleSelected()
  };

  toggleComponent = () => {
    if (this.state.selected) {
      return <TempGen meme={this.state.selectedImg} toggleSelected={this.toggleSelected} />;
    } else {
      return (
        <Gallery
          images={this.state.images.filter((i) => i.box_count === 2)}
          handleclick={this.handleImgClick}
        />
      );
    }
  };

  render() {
    return <div>
      {this.toggleComponent()}
    </div>;
  }

  toggleSelected = () => {
    this.setState({ selected: !this.state.selected })
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((r) => r.json())
      .then((images) => {
        this.setState({ images: images.data.memes });
      });
  }
}
