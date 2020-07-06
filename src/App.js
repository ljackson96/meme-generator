import React, { Component } from "react";
import Gallery from "./Gallery";

export default class App extends Component {
  state = {
    images: [],
  };

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((r) => r.json())
      .then((images) => {
        this.setState({ images: images.data.memes });
      });
  }
  render() {
    return (
      <div>
        <Gallery images={this.state.images.filter((i) => i.box_count === 2)} />
      </div>
    );
  }
}
