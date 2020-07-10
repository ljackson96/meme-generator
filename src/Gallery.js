import React, { Component } from "react";
import Image from "./Image";
import "./ImageList.css"

export default class Gallery extends Component {

  handleUpload = () => {
    document.getElementById("uploadform").hidden = !(document.getElementById("uploadform").hidden)
  }

  getDimensions = (event) => {
    event.preventDefault();
    let url = document.getElementById("uploadmeme").value
    let callback = function(width, height) { console.log(width + 'px ' + height + 'px') }
    this.helperFunction(url, callback);
  }

  helperFunction(url, callback) {
    var img = new Image();
    img.src = document.getElementById("uploadmeme").value
    // console.log( img.src );
    img.onload = function() { callback(this.width, this.height); }
  }

  render() {
    return (
      <div>
        <div className="h1">
          MEME GENERATOR
        </div>

        <div className="top-buttons">
          <button className="btn-gallery" onClick={() => this.props.handleRandom()}>Random Meme</button>
          <button className="btn-gallery" onClick={() => this.handleUpload()}>Upload Template</button>
        </div>

        <form onSubmit={(event) => this.getDimensions(event)} id="uploadform" hidden={true}>
          <input
            className="uploadmeme"
            type="text"
            name="uploadmeme"
            id="uploadmeme"
            placeholder="Input image URL here"
          />
          <button>Submit</button>
        </form>

        <div className="image-list">
          {this.props.images.map((image) => {
            return (
              <Image
                key={image.id}
                image={image}
                handleclick={this.props.handleclick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
