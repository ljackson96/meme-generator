import React, { Component } from "react";
import Gallery from "./Gallery";
import Generator from "./Generator";

export default class App extends Component {
  state = {
    images: [],
    selected: null,
    selectedImg: "",
  };

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((r) => r.json())
      .then((images) => {
        this.setState({ images: images.data.memes });
      });
  }

  handleImgClick = (e) => {
    console.log("clicked", e.target.id);
    this.setState({
      selected: true,
      selectedImg: this.state.images.find((i) => i === e.target),
    });
  };

  toggleComponent = () => {
    if (this.state.selected) {
      return <Generator />;
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
    return <div>{this.toggleComponent()}</div>;
  }
}
