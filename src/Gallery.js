import React, { Component } from "react";
import Image from "./Image";

export default class Gallery extends Component {
  render() {
    return (
      <div>
        {this.props.images.map((image) => {
          return <Image key={image.id} image={image} />;
        })}
      </div>
    );
  }
}
