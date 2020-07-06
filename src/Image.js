import React from "react";

export default function Image(props) {
  return (
    <div>
      <img src={props.image.url} alt={props.image.id} />
    </div>
  );
}
